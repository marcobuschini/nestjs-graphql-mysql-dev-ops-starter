import { ApolloServerPlugin } from '@apollo/server'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LoggingPlugin implements ApolloServerPlugin {
  requestDidStart(): Promise<void> {
    console.log('Request started')
    return Promise.resolve()
  }
}
