import { Test, TestingModule } from '@nestjs/testing'
import { resolve } from 'path'
import { config } from 'dotenv'
import { CatsGuard } from './cats.guard'
import { GqlExecutionContext } from '@nestjs/graphql'

describe('CatsService', () => {
  let app: TestingModule
  let catsGuard: CatsGuard

  beforeAll(() => {
    const envFile =
      '.env' +
      (process.env.NODE_ENV !== 'prod' ? '.' + process.env.NODE_ENV : '')
    const path = '../../' + envFile
    console.log(`Reading configuration from ${envFile}`)
    config({ path: resolve(__dirname, path) })
  })

  beforeEach(async () => {
    app = await Test.createTestingModule({}).compile()
    catsGuard = new CatsGuard()
  })

  afterEach(async () => {
    await app.close()
  })

  describe('CatsGuard', () => {
    it('canActivate()', async () => {
      await expect(catsGuard.canActivate(new GqlExecutionContext([]))).toEqual(
        true
      )
    })
  })
})
