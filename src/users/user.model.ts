import { Column, Model, Table } from 'sequelize-typescript'
import { sha512 } from 'js-sha512'
import { randomBytes } from 'crypto'

@Table({ tableName: 'user' })
export class User extends Model<User> {
  @Column
  firstName: string

  @Column
  lastName: string

  @Column
  username: string

  @Column({ field: 'password' })
  private encryptedPassword: string

  set password(password: string) {
    this.salt = randomBytes(64).toString('base64')

    let temp = password
    for (let i = 0; i < 255; i++) {
      temp = sha512.hex(this.salt + temp)
    }
    this.encryptedPassword = temp
  }

  @Column
  private salt: string

  @Column({ defaultValue: true })
  isActive: boolean

  public checkPassword(password: string): boolean {
    let temp = password
    for (let i = 0; i < 255; i++) {
      temp = sha512.hex(this.salt + temp)
    }
    return temp === this.encryptedPassword
  }
}
