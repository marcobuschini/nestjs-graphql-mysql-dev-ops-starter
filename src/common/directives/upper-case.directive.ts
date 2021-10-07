/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultFieldResolver, GraphQLField } from 'graphql'

export class UpperCaseDirective {
  visitFieldDefinition(field: GraphQLField<any, any>): any {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function (...args): Promise<any> {
      const result = await resolve.apply(this, args)
      if (typeof result === 'string') {
        return result.toUpperCase()
      }
      return result
    }
  }
}
