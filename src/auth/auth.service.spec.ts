import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/user.entity'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            sequelize: null,
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test_token'),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(({
              id: 1,
              username: 'user',
              firstName: 'First',
              lastName: 'Last',
              password: 'test',
              encryptedPassword:
                'e0578bc3977fcbedb81e1e6a8a1603e9287e2f3572b30de90171fa56d67062e13062f0566f42d6c3be1ca67cbc9963c9f978d6f468053b06d0acec25986e1b1d',
              salt:
                '7Vpo3gHYfSBxxpWi/76upY3nFiq0us17ablhIbh7PO63LTLMEYvckiDIZD7xw4V0Ip6FBewuYMHEpV9ZFL5RMQ==',
              isActive: true,
              checkPassword: jest.fn((password) => password === 'password'),
            } as unknown) as User),
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
    await expect(token).toEqual({ access_token: 'test_token' })
  })
})
