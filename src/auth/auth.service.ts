import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<string> {
    const user = await this.usersService.findOne(username)
    if (user && user.checkPassword(password)) {
      return user.username
    }
    return null
  }

  async login(user: User): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
    }
  }
}
