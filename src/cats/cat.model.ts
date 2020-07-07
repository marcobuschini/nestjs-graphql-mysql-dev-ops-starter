import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript'
import { Cat as ICat } from '../graphql.schema'

@Table({ tableName: 'cat' })
export class Cat extends Model<Cat> implements ICat {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @Column
  name: string

  @Column
  age: number
}
