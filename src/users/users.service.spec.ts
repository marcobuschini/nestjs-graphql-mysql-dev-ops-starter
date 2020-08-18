import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { User } from './user.entity'
import { resolve } from 'path'
import { config } from 'dotenv'
import { getRepositoryToken } from '@nestjs/typeorm'
import { of } from 'rxjs'
import { RefreshToken } from '../auth/refresh-token.entity'

describe('UsersService', () => {
  let app: TestingModule
  let usersService: UsersService
  let refreshSuccess: boolean

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

  const refresh_token = new RefreshToken()

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
            createQueryBuilder: jest.fn(() => ({
              offset: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              getOne: jest.fn().mockReturnValueOnce(user1),
              where: jest.fn().mockReturnThis(),
            })),
          },
        },
        {
          provide: getRepositoryToken(RefreshToken),
          useValue: {
            save: (rt: RefreshToken): Promise<RefreshToken> =>
              of(rt).toPromise(),
            remove: (): Promise<void> => of(undefined).toPromise(),
            createQueryBuilder: jest.fn(() => ({
              offset: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              innerJoinAndSelect: jest.fn().mockReturnThis(),
              getOne: jest.fn().mockImplementation(() =>
                refreshSuccess
                  ? Promise.resolve({
                      user: ({
                        id: 1,
                        username: 'user',
                        firstName: 'Henry',
                        lastName: 'Richardson',
                        password: 'test',
                        encryptedPassword:
                          'e0578bc3977fcbedb81e1e6a8a1603e9287e2f3572b30de90171fa56d67062e13062f0566f42d6c3be1ca67cbc9963c9f978d6f468053b06d0acec25986e1b1d',
                        salt:
                          '7Vpo3gHYfSBxxpWi/76upY3nFiq0us17ablhIbh7PO63LTLMEYvckiDIZD7xw4V0Ip6FBewuYMHEpV9ZFL5RMQ==',
                        isActive: true,
                        refreshTokens: null,
                        checkPassword: (password) => password === 'password',
                      } as Partial<User>) as User,
                    })
                  : Promise.reject({})
              ),
              where: jest.fn().mockReturnThis(),
            })),
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

    it('findOneByRefreshToken() - success', async () => {
      refreshSuccess = true

      const user = await usersService.findOneByRefreshToken(
        refresh_token.refreshToken
      )
      await expect(user.firstName).toEqual(user1.firstName)
      await expect(user.lastName).toEqual(user1.lastName)
    })

    it('findOneByRefreshToken() - failure', async () => {
      refreshSuccess = false

      await expect(usersService.findOneByRefreshToken('fake')).rejects.toEqual(
        'Invalid token'
      )
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
