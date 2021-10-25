import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/entity/user.entity'
import { RefreshToken } from '../entity/refresh-token.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>
  ) {}

  googleLogin(req: Express.Request): { message: string; user: Express.User } {
    if (!req.user) {
      console.error('No user from Google')
      return {
        message: 'No user from Google',
        user: null,
      }
    }

    console.log('User information from Google')
    console.log(req.user)
    return {
      message: 'User information from Google',
      user: req.user,
    }
  }

  async validateUser(username: string, password: string): Promise<string> {
    const user = await this.usersService.findOne(username)
    if (user && user.checkPassword(password)) {
      return user.username
    }
    return null
  }

  async login(
    user: User,
    token = ''
  ): Promise<{ access_token: string; refresh_token: string }> {
    if (token === '') {
      const refresh = new RefreshToken()
      refresh.user = user
      token = refresh.refreshToken
      await this.refreshTokenRepository.save(refresh)
    }
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      refresh_token: token,
    }
  }

  async refresh(
    token: string
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findOneByRefreshToken(token)
    return this.login(user, token)
  }
}
