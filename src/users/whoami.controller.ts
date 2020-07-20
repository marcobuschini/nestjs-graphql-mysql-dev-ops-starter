import { Controller, Get, Inject } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'

@Controller('whoami')
export class WhoAmIController {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  @Get()
  whoAmI(): string {
    if (this.request.user) return `Logged in as ${this.request.user.toString()}`
    else return `Not logged in`
  }
}
