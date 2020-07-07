import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { resolve } from 'path'
import { config } from 'dotenv'

async function bootstrap(): Promise<void> {
  const envFile =
    '.env' + (process.env.NODE_ENV !== 'prod' ? '.' + process.env.NODE_ENV : '')
  const path = '../../' + envFile
  console.log(`Reading configuration from ${envFile}`)
  config({ path: resolve(__dirname, path) })

  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
