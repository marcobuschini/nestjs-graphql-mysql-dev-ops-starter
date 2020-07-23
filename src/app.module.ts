import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { GraphQLModule } from '@nestjs/graphql'
import { CatsModule } from './cats/cats.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { GoogleStrategy } from './google.strategy'
import { WhoAmIController } from './users/whoami.controller'
import { AuthModule } from './auth/auth.module'
import { TypeOrmConfigService } from './typeorm-config.service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    CatsModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      playground: true,
    }),
    AuthModule,
  ],
  providers: [AppService, GoogleStrategy],
  controllers: [AppController, WhoAmIController],
})
export class AppModule {}
