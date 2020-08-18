import { Injectable } from '@nestjs/common'
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
    let refresh: RefreshToken
    try {
      const builder = this.refreshTokenRepository
        .createQueryBuilder('refresh_token')
        .innerJoinAndSelect('refresh_token.user', 'user')
        .where('refresh_token.refreshToken = :token', { token: token })
      refresh = await builder.getOne()
    } catch (e) {
      return Promise.reject('Invalid token')
    }
    const now = moment()
    if (now.isAfter(refresh.expiresAt)) {
      return Promise.reject('Token expired')
    }
    return refresh.user
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id)
    await this.userRepository.remove(user)
  }
}
