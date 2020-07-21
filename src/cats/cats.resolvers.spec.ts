import { Test, TestingModule } from '@nestjs/testing'
import { CatsService } from './cats.service'
import { Cat } from '../graphql.schema'
import { CatsResolvers } from './cats.resolvers'
import { CatsModule } from './cats.module'
import { resolve } from 'path'
import { config } from 'dotenv'
import { SequelizeModule } from '@nestjs/sequelize'

jest.mock('./cats.service')

describe('CatsResolver', () => {
  let app: TestingModule
  let catsResolver: CatsResolvers
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
      providers: [CatsService, CatsResolvers],
    }).compile()

    catsResolver = app.get<CatsResolvers>(CatsResolvers)
  })

  afterEach(async () => {
    await app.close()
  })

  describe('CR-D', () => {
    it('create() and catCreated()', async () => {
      const catCreated = catsResolver.catCreated()
      const created1: Promise<Cat> = catsResolver.create({
        name: cat1.name,
        age: cat1.age,
      })
      await expect(catCreated.next()).resolves.toMatchObject({
        value: {
          catCreated: {
            name: cat1.name,
            age: cat1.age,
            id: null,
          },
        },
      })
      await expect(created1).resolves.toMatchObject({
        name: cat1.name,
        age: cat1.age,
        id: null,
      })

      const created2: Promise<Cat> = catsResolver.create({
        name: cat2.name,
        age: cat2.age,
      })
      await expect(catCreated.next()).resolves.toMatchObject({
        value: {
          catCreated: {
            name: cat2.name,
            age: cat2.age,
            id: null,
          },
        },
      })
      await expect(created2).resolves.toMatchObject({
        name: cat2.name,
        age: cat2.age,
        id: null,
      })
    })

    it('findAll()', async () => {
      const allCats = await catsResolver.getCats()
      expect(allCats[0].name).toEqual(cat1.name)
      expect(allCats[0].age).toEqual(cat1.age)
      expect(allCats[1].name).toEqual(cat2.name)
      expect(allCats[1].age).toEqual(cat2.age)
    })

    it('findOne()', async () => {
      const allCats = await catsResolver.getCats()
      const cat = await catsResolver.findOne(allCats[0].id)
      expect(cat.name).toEqual(cat1.name)
      expect(cat.age).toEqual(cat1.age)
    })
  })
})
