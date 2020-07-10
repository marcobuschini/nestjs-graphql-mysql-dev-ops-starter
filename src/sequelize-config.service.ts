import { Injectable } from '@nestjs/common'
import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from '@nestjs/sequelize'

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
      autoLoadModels: true,
      synchronize: true,
    }
  }
}
