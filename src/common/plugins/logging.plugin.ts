import { Plugin } from "@nestjs/graphql";
import { ValueOrPromise } from 'apollo-server-env';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from "apollo-server-plugin-base";

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  requestDidStart(): GraphQLRequestListener {
    console.log("Request started");
    return {
      willSendResponse(): ValueOrPromise<void> {
        console.log("Will send response");
      },
    };
  }
}
