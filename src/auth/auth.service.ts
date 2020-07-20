import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { User } from 'src/users/user.model'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(username)
    if (user && user.checkPassword(password)) {
      return user
    }
    return null
  }
}
