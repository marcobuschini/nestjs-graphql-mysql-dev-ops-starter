import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from '../entity/user.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get(':username')
  findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne(username)
  }

  @Delete(':username')
  remove(@Param('username') username: string): Promise<void> {
    return this.usersService.remove(username)
  }
}
