import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Cat as ICat } from '../graphql.schema'

@Entity({ name: 'cat' })
export class Cat extends BaseEntity implements ICat {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  age: number

  constructor() {
    super()
  }
}
