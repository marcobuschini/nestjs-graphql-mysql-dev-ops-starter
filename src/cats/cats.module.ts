import { Module } from '@nestjs/common'
import { CatsResolvers } from './cats.resolvers'
import { CatsService } from './cats.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cat } from '../entity/cat.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  exports: [TypeOrmModule],
  providers: [CatsService, CatsResolvers],
})
export class CatsModule {}
