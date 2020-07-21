import { ParseIntPipe, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { Cat } from '../graphql.schema'
import { CatsGuard } from './cats.guard'
import { CatsService } from './cats.service'
import { CreateCatDto } from './dto/create-cat.dto'

@Resolver('Cat')
export class CatsResolvers {
  static readonly pubSub = new PubSub()

  constructor(private readonly catsService: CatsService) {}

  @Query()
  @UseGuards(CatsGuard)
  async getCats(): Promise<Cat[]> {
    return this.catsService.findAll()
  }

  @Query('cat')
  async findOne(
    @Args('id', ParseIntPipe)
    id: number
  ): Promise<Cat> {
    return this.catsService.findOne(id)
  }

  @Mutation('createCat')
  async create(@Args('createCatInput') args: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catsService.create(args)
    void CatsResolvers.pubSub.publish('catCreated', { catCreated: createdCat })
    return createdCat
  }

  @Subscription('catCreated')
  catCreated(): AsyncIterator<
    string,
    { catCreated: Cat },
    { catCreated: Cat }
  > {
    return CatsResolvers.pubSub.asyncIterator<string>('catCreated')
  }
}
