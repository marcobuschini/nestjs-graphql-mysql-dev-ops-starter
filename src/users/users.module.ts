import { Module } from '@nestjs/common'
import { User } from '../entity/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RefreshToken } from 'src/entity/refresh-token.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken])],
  exports: [TypeOrmModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
