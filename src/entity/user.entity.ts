import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm'
import { sha512 } from 'js-sha512'
import { randomBytes } from 'crypto'
import { RefreshToken } from './refresh-token.entity'

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  username: string

  @Column({ name: 'password' })
  private encryptedPassword: string

  constructor() {
    super()
  }

  set password(password: string) {
    this.salt = randomBytes(64).toString('base64')

    let temp = password
    for (let i = 0; i < 255; i++) {
      temp = sha512.hex(this.salt + temp)
    }
    this.encryptedPassword = temp
  }

  @Column()
  private salt: string

  @Column({ default: true })
  isActive: boolean

  @OneToMany(() => RefreshToken, (refresh_token) => refresh_token.user)
  refreshTokens: RefreshToken[]

  public checkPassword(password: string): boolean {
    let temp = password
    for (let i = 0; i < 255; i++) {
      temp = sha512.hex(this.salt + temp)
    }
    return temp === this.encryptedPassword
  }
}
