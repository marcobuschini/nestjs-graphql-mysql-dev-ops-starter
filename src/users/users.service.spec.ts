import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { User } from './user.entity'
import { resolve } from 'path'
import { config } from 'dotenv'
import { getRepositoryToken } from '@nestjs/typeorm'
import { of } from 'rxjs'

describe('UsersService', () => {
  let app: TestingModule
  let usersService: UsersService
  const user1 = new User()
  user1.id = 1
  user1.username = 'hrichardson'
  user1.firstName = 'Henry'
  user1.lastName = 'Richardson'
  user1.password = 'password'

  const user2 = new User()
  user2.id = 2
  user2.username = 'mcarter'
  user2.firstName = 'Mary'
  user2.lastName = 'Carter'
  user2.password = 'password'

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
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: (): Promise<User[]> => of([user1, user2]).toPromise(),
            findOne: ({ where: { id } }): Promise<User> =>
              of([user1, user2].find((u) => u.id == id)).toPromise(),
            save: (u: User): Promise<User> => of(u).toPromise(),
            remove: (): Promise<void> => of(undefined).toPromise(),
          },
        },
        UsersService,
      ],
    }).compile()

    usersService = app.get<UsersService>(UsersService)
  })

  afterEach(async () => {
    await app.close()
  })

  describe('CR-D', () => {
    it('create()', async () => {
      const created1 = await usersService.create({
        username: user1.username,
        firstName: user1.firstName,
        lastName: user1.lastName,
        password: user1.password,
      })
      expect(created1).toMatchObject({
        username: user1.username,
        firstName: user1.firstName,
        lastName: user1.lastName,
      })
      const created2 = await usersService.create({
        username: user2.username,
        firstName: user2.firstName,
        lastName: user2.lastName,
        password: user2.password,
      })
      expect(created2).toMatchObject({
        username: user2.username,
        firstName: user2.firstName,
        lastName: user2.lastName,
      })
    })

    it('findAll()', async () => {
      const allUsers = await usersService.findAll()
      expect(allUsers[0].firstName).toEqual(user1.firstName)
      expect(allUsers[0].lastName).toEqual(user1.lastName)
      expect(allUsers[1].firstName).toEqual(user2.firstName)
      expect(allUsers[1].lastName).toEqual(user2.lastName)
    })

    it('findOne()', async () => {
      const user = await usersService.findOne('1')
      expect(user.firstName).toEqual(user1.firstName)
      expect(user.lastName).toEqual(user1.lastName)
    })

    it('checkPassword()', async () => {
      const user = await usersService.findOne('1')
      expect(user.checkPassword('password')).toBeTruthy()
    })

    it('remove()', async () => {
      await expect(usersService.remove('1')).resolves.toBeUndefined()
      await expect(usersService.remove('2')).resolves.toBeUndefined()
    })
  })
})
