import { Min } from 'class-validator'
import { CreateCatInput } from '../../graphql.schema'

export class CreateCatDto implements CreateCatInput {
  @Min(1)
  age: number
  name: string
}
