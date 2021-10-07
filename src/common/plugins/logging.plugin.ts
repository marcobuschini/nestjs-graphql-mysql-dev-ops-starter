import { Plugin } from '@nestjs/graphql'
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
} from 'apollo-server-plugin-base'

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  requestDidStart(
    requestContext: GraphQLRequestContext<BaseContext>
  ): Promise<void> {
    console.log('Request started')
    console.log('Will send response')
    return Promise.resolve()
  }
}
