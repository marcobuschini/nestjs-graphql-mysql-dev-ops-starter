import { resolve } from 'path'
import { config } from 'dotenv'
import { loadFiles } from 'sequelize-fixtures'
import { Cat } from './cats/cat.model'
import { User } from './users/user.model'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

const envFile =
  '.env' + (process.env.NODE_ENV !== 'prod' ? '.' + process.env.NODE_ENV : '')
const path = '../' + envFile
console.log(`Reading configuration from ${envFile}`)
config({ path: resolve(__dirname, path) })

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  models: [Cat, User],
} as SequelizeOptions)

loadFiles(['fixtures/**/*.fixture.yml'], sequelize.models)
