import { Module } from '@nestjs/common'
import { User } from './user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RefreshToken } from 'src/auth/refresh-token.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken])],
  exports: [TypeOrmModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
