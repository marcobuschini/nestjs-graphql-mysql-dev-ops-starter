import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
} from 'apollo-server-plugin-base'

export class LoggingPlugin implements ApolloServerPlugin {
  requestDidStart(
    requestContext: GraphQLRequestContext<BaseContext>
  ): Promise<void> {
    console.log('Request started')
    console.log('Will send response')
    console.log(requestContext.request)
    return Promise.resolve()
  }
}
