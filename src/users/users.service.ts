import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RefreshToken } from '../auth/refresh-token.entity'
import * as moment from 'moment'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User()
    user.username = createUserDto.username
    user.firstName = createUserDto.firstName
    user.lastName = createUserDto.lastName
    user.password = createUserDto.password

    return this.userRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  findOne(username: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: username })
      .getOne()
  }

  async findOneByRefreshToken(token: string): Promise<User> {
    try {
      const builder = this.refreshTokenRepository
        .createQueryBuilder('refresh_token')
        .innerJoinAndSelect('refresh_token.user', 'user')
        .where('refresh_token.refreshToken = :token', { token: token })
      const refresh = await builder.getOne()
      const now = moment()
      if (now.isAfter(refresh.expiresAt)) {
        throw new HttpException('Token expired', HttpStatus.BAD_REQUEST)
      }
      return refresh.user
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id)
    await this.userRepository.remove(user)
  }
}
