import { Injectable } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class AppService {
  googleLogin(req: Request): { message: string; user: Express.User } {
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
}
