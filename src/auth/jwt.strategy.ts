import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { JwtConfigService } from 'src/jwt-config.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(jwt: JwtConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.private,
    })
  }

  async validate(payload: {
    sub: string
    username: string
  }): Promise<{ userId: string; username: string }> {
    return { userId: payload.sub, username: payload.username }
  }
}
