import { Column, Entity, PrimaryColumn, ManyToOne } from 'typeorm'
import { randomBytes } from 'crypto'
import { User } from '../users/user.entity'

@Entity({ name: 'refresh_token' })
export class RefreshToken {
  constructor() {
    this.refresh()
  }

  @PrimaryColumn()
  refreshToken: string

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User

  @Column()
  expiresAt: Date

  public refresh(): void {
    this.refreshToken = randomBytes(64).toString('base64')
    const future = new Date()
    future.setDate(future.getDate() + 30)
    this.expiresAt = future
  }
}
