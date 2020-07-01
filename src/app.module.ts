import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { GraphQLModule } from "@nestjs/graphql";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "password",
      database: "cats",
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    CatsModule,
    GraphQLModule.forRoot({
      typePaths: ["./**/*.graphql"],
      installSubscriptionHandlers: true,
      playground: true,
    }),
  ],
})
export class AppModule {}
