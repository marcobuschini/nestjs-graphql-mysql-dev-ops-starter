/* eslint-disable @typescript-eslint/no-explicit-any */
import { SchemaDirectiveVisitor } from 'apollo-server'
import { defaultFieldResolver, GraphQLField } from 'graphql'

export class UpperCaseDirective extends SchemaDirectiveVisitor {
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
