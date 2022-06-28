import { Test, TestingModule } from '@nestjs/testing'
import { CatsService } from './cats.service'
import { Cat } from '../entity/cat.entity'
import { resolve } from 'path'
import { config } from 'dotenv'
import { getRepositoryToken } from '@nestjs/typeorm'
import { firstValueFrom, of } from 'rxjs'

describe('CatsService', () => {
  let app: TestingModule
  let catsService: CatsService

  const cat1 = new Cat()
  cat1.name = 'Birch'
  cat1.age = 2

  const cat2 = new Cat()
  cat2.name = 'Tabby'
  cat2.age = 5

  let id: number

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
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useValue: {
            find: (): Promise<Cat[]> => firstValueFrom(of([cat1, cat2])),
            findOne: ({ where: { id } }): Promise<Cat> =>
              firstValueFrom(of([cat1, cat2].find((c) => c.id == id))),
            save: (c: Cat): Promise<Cat> => firstValueFrom(of(c)),
            remove: (): Promise<void> => firstValueFrom(of(undefined)),
          },
        },
      ],
    }).compile()

    catsService = app.get<CatsService>(CatsService)
  })

  afterEach(async () => {
    await app.close()
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
      expect(allCats[0].name).toEqual(cat1.name)
      expect(allCats[0].age).toEqual(cat1.age)
      expect(allCats[1].name).toEqual(cat2.name)
      expect(allCats[1].age).toEqual(cat2.age)
      id = allCats[0].id
    })

    it('findOne()', async () => {
      const cat = await catsService.findOne(id)
      expect(cat.name).toEqual(cat1.name)
      expect(cat.age).toEqual(cat1.age)
    })

    it('remove()', async () => {
      await expect(catsService.remove(1)).resolves.toBeUndefined()
      await expect(catsService.remove(2)).resolves.toBeUndefined()
    })
  })
})
