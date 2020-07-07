import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { User } from './user.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users.module'
import { resolve } from 'path'
import { config } from 'dotenv'

describe('UsersService', () => {
  let usersService: UsersService
  const user1: Partial<User> = {}
  user1.firstName = 'First Name 1'
  user1.lastName = 'Last Name 1'

  const user2: Partial<User> = {}
  user2.firstName = 'First Name 2'
  user2.lastName = 'Last Name 2'

  beforeAll(() => {
    const envFile =
      '.env' +
      (process.env.NODE_ENV !== 'prod' ? '.' + process.env.NODE_ENV : '')
    const path = '../../' + envFile
    console.log(`Reading configuration from ${envFile}`)
    config({ path: resolve(__dirname, path) })
  })

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
        UsersModule,
      ],
      providers: [UsersService],
    }).compile()

    usersService = app.get<UsersService>(UsersService)
  })

  describe('CR-D', () => {
    it('create()', async () => {
      await expect(
        usersService.create({
          firstName: user1.firstName,
          lastName: user1.lastName,
        })
      ).resolves.toMatchObject(user1)
      await expect(
        usersService.create({
          firstName: user2.firstName,
          lastName: user2.lastName,
        })
      ).resolves.toMatchObject(user2)
    })

    it('findAll()', async () => {
      const allUsers = await usersService.findAll()
      await expect(allUsers[0].firstName).toEqual(user1.firstName)
      await expect(allUsers[0].lastName).toEqual(user1.lastName)
      await expect(allUsers[1].firstName).toEqual(user2.firstName)
      await expect(allUsers[1].lastName).toEqual(user2.lastName)
    })

    it('findOne()', async () => {
      const user = await usersService.findOne('1')
      await expect(user.firstName).toEqual(user1.firstName)
      await expect(user.lastName).toEqual(user1.lastName)
    })

    it('remove()', async () => {
      await expect(usersService.remove('1')).resolves.toBeUndefined()
      await expect(usersService.remove('2')).resolves.toBeUndefined()
    })
  })
})
