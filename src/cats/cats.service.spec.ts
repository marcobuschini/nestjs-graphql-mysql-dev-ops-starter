import { Test, TestingModule } from '@nestjs/testing'
import { CatsService } from './cats.service'
import { Cat } from './cat.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { CatsModule } from './cats.module'
import { resolve } from 'path'
import { config } from 'dotenv'

describe('CatsService', () => {
  let app: TestingModule
  let catsService: CatsService
  const cat1: Partial<Cat> = {}
  cat1.name = 'Birch'
  cat1.age = 2

  const cat2: Partial<Cat> = {}
  cat2.name = 'Tabby'
  cat2.age = 5

  beforeAll(() => {
    const envFile =
      '.env' +
      (process.env.NODE_ENV !== 'prod' ? '.' + process.env.NODE_ENV : '')
    const path = '../../' + envFile
    console.log(`Reading configuration from ${envFile}`)
    config({ path: resolve(__dirname, path) })
  })

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_SCHEMA,
          autoLoadModels: true,
          synchronize: true,
        }),
        CatsModule,
      ],
      providers: [CatsService],
    }).compile()

    catsService = app.get<CatsService>(CatsService)
  })

  afterEach(async () => {
    app.close()
  })

  describe('CR-D', () => {
    it('create()', async () => {
      await expect(
        catsService.create({
          name: cat1.name,
          age: cat1.age,
        })
      ).resolves.toMatchObject(cat1)
      await expect(
        catsService.create({
          name: cat2.name,
          age: cat2.age,
        })
      ).resolves.toMatchObject(cat2)
    })

    it('findAll()', async () => {
      const allCats = await catsService.findAll()
      await expect(allCats[0].name).toEqual(cat1.name)
      await expect(allCats[0].age).toEqual(cat1.age)
      await expect(allCats[1].name).toEqual(cat2.name)
      await expect(allCats[1].age).toEqual(cat2.age)
    })

    it('findOne()', async () => {
      const cat = await catsService.findOne(1)
      await expect(cat.name).toEqual(cat1.name)
      await expect(cat.age).toEqual(cat1.age)
    })

    it('remove()', async () => {
      await expect(catsService.remove(1)).resolves.toBeUndefined()
      await expect(catsService.remove(2)).resolves.toBeUndefined()
    })
  })
})
