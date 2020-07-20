import { Controller, Get, Req, UseGuards, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  googleAuth(@Req() _req: Request): void {
    console.log('test')
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(
    @Req() req: Request
  ): { message: string; user: Express.User } {
    return this.appService.googleLogin(req)
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  login(@Req() req: Request): Express.User {
    return req.user
  }
}
