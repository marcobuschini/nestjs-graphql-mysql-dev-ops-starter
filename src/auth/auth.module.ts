import { Module } from '@nestjs/common'
import { JwtModule, JwtSecretRequestType, JwtModuleOptions } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { UsersService } from 'src/users/users.service'
import { readFileSync } from 'fs'
import { JwtStrategy } from './jwt.strategy'
import { JwtConfigService } from 'src/jwt-config.service'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
        switch (requestType) {
          case JwtSecretRequestType.SIGN:
            return readFileSync(process.env.PRIVATE_KEY)
          case JwtSecretRequestType.VERIFY:
            return readFileSync(process.env.PUBLIC_KEY)
          default:
            return process.env.SECRET
        }
      },
      signOptions: { expiresIn: '300s' },
    } as JwtModuleOptions),
  ],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    JwtConfigService,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
