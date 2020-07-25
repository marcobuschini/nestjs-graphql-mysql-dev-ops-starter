import { Injectable } from '@nestjs/common'
import { readFileSync } from 'fs'

@Injectable()
export class JwtConfigService {
  public readonly public: string
  public readonly private: string

  constructor() {
    this.public = readFileSync(process.env.PUBLIC_KEY).toString()
    this.private = readFileSync(process.env.PRIVATE_KEY).toString()
  }
}
