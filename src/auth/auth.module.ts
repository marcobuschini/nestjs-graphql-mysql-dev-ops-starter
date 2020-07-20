import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, UsersService, LocalStrategy],
})
export class AuthModule {}
