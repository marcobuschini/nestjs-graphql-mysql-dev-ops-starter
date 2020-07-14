import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { resolve } from 'path'
import { config } from 'dotenv'

async function bootstrap(): Promise<void> {
  const envFile =
    '.env' +
    (process.env.NODE_ENV !== 'production' ? '.' + process.env.NODE_ENV : '')
  const path = '../' + envFile
  console.log(`Reading configuration from ${envFile}`)
  const parsed = config({ path: resolve(__dirname, path) })
  if (parsed.error) {
    console.error(`Unable to read configuration from ${envFile} file`)
    console.error(parsed.error)
  }
  console.log(
    `Database host is '${process.env.DB_HOST}' and schema is '${process.env.DB_SCHEMA}'`
  )

  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Users example')
      .setDescription('The users API description')
      .setVersion('1.0')
      .addTag('users')
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)
  }

  await app.listen(process.env.PORT || 3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
