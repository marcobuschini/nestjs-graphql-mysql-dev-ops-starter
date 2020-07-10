import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module'
import { GraphQLModule } from '@nestjs/graphql'
import { CatsModule } from './cats/cats.module'
import { SequelizeConfigService } from './sequelize-config.service'

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
  ],
})
export class AppModule {}
