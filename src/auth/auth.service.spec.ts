import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../entity/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { RefreshToken } from '../entity/refresh-token.entity'
import { of, firstValueFrom } from 'rxjs'

jest.mock('../entity/refresh-token.entity')

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test_token'),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              username: 'user',
              firstName: 'First',
              lastName: 'Last',
              password: 'test',
              encryptedPassword:
                'e0578bc3977fcbedb81e1e6a8a1603e9287e2f3572b30de90171fa56d67062e13062f0566f42d6c3be1ca67cbc9963c9f978d6f468053b06d0acec25986e1b1d',
              salt: '7Vpo3gHYfSBxxpWi/76upY3nFiq0us17ablhIbh7PO63LTLMEYvckiDIZD7xw4V0Ip6FBewuYMHEpV9ZFL5RMQ==',
              isActive: true,
              checkPassword: (password) => password === 'password',
            } as unknown as User),
            findOneByRefreshToken: jest.fn().mockResolvedValue({
              id: 1,
              username: 'user',
              firstName: 'First',
              lastName: 'Last',
              password: 'test',
              encryptedPassword:
                'e0578bc3977fcbedb81e1e6a8a1603e9287e2f3572b30de90171fa56d67062e13062f0566f42d6c3be1ca67cbc9963c9f978d6f468053b06d0acec25986e1b1d',
              salt: '7Vpo3gHYfSBxxpWi/76upY3nFiq0us17ablhIbh7PO63LTLMEYvckiDIZD7xw4V0Ip6FBewuYMHEpV9ZFL5RMQ==',
              isActive: true,
              checkPassword: (password) => password === 'password',
            } as unknown as User),
          },
        },
        {
          provide: getRepositoryToken(RefreshToken),
          useValue: {
            save: (rt: RefreshToken): Promise<RefreshToken> =>
              firstValueFrom(of(rt)),
            remove: (): Promise<void> => firstValueFrom(of(undefined)),
            createQueryBuilder: jest.fn(() => ({
              offset: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              innerJoinAndSelect: jest.fn().mockReturnThis(),
              getOne: jest.fn().mockReturnValueOnce({
                user: {
                  id: 1,
                  username: 'user',
                  firstName: 'First',
                  lastName: 'Last',
                  password: 'test',
                  encryptedPassword:
                    'e0578bc3977fcbedb81e1e6a8a1603e9287e2f3572b30de90171fa56d67062e13062f0566f42d6c3be1ca67cbc9963c9f978d6f468053b06d0acec25986e1b1d',
                  salt: '7Vpo3gHYfSBxxpWi/76upY3nFiq0us17ablhIbh7PO63LTLMEYvckiDIZD7xw4V0Ip6FBewuYMHEpV9ZFL5RMQ==',
                  isActive: true,
                  checkPassword: (password) => password === 'password',
                } as unknown as User,
              }),
              where: jest.fn().mockReturnThis(),
            })),
          },
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should validate user, valid password', async () => {
    await expect(
      service.validateUser('username', 'password')
    ).resolves.toBeTruthy()
  })

  it('should validate user, invalid passsword', async () => {
    await expect(service.validateUser('username', 'wrong')).resolves.toBeFalsy()
  })

  it('should login the user', async () => {
    const user = new User()
    user.id = 1
    user.username = 'test'

    const token = await service.login(user)
    await expect(token).toEqual({
      access_token: 'test_token',
      refresh_token: undefined,
    })
  })

  it('should refresh the token', async () => {
    await expect(service.refresh('refresh_token')).resolves.toEqual({
      access_token: 'test_token',
      refresh_token: 'refresh_token',
    })
  })

  it('should login with Google', async () => {
    await expect(service.googleLogin({} as Express.Request)).toEqual({
      message: 'No user from Google',
      user: null,
    })
    await expect(
      service.googleLogin({
        user: 'fake',
        login: jest.fn(),
        logIn: jest.fn(),
        logout: jest.fn(),
        logOut: jest.fn(),
        isAuthenticated: () => true,
        isUnauthenticated: () => false,
      } as Express.Request)
    ).toEqual({ message: 'User information from Google', user: 'fake' })
  })
})
