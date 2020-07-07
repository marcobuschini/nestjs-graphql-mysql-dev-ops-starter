import { Module } from '@nestjs/common'
import { CatsResolvers } from './cats.resolvers'
import { CatsService } from './cats.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Cat } from './cat.model'

@Module({
  imports: [SequelizeModule.forFeature([Cat])],
  exports: [SequelizeModule],
  providers: [CatsService, CatsResolvers],
})
export class CatsModule {}
