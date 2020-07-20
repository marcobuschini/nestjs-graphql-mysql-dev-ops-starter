import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module'
import { GraphQLModule } from '@nestjs/graphql'
import { CatsModule } from './cats/cats.module'
import { SequelizeConfigService } from './sequelize-config.service'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { GoogleStrategy } from './google.strategy'
import { WhoAmIController } from './users/whoami.controller'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
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
