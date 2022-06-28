import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { GraphQLModule } from '@nestjs/graphql'
import { CatsModule } from './cats/cats.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppService } from './app.service'
import { GoogleStrategy } from './google.strategy'
import { AuthModule } from './auth/auth.module'
import { TypeOrmConfigService } from './typeorm-config.service'
import { AuthService } from './auth/auth.service'
import { AuthController } from './auth/auth.controller'
import { UsersService } from './users/users.service'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    CatsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      playground: true,
      driver: ApolloDriver,
    }),
    AuthModule,
  ],
  providers: [AppService, AuthService, GoogleStrategy, UsersService],
  controllers: [AuthController],
})
export class AppModule {}
