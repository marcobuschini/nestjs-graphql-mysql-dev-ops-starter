import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateCatDto } from './dto/create-cat.dto'
import { Cat } from './cat.model'

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat)
    public readonly catModel: typeof Cat
  ) {}

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = new Cat()
    cat.age = createCatDto.age
    cat.name = createCatDto.name

    return cat.save()
  }

  findAll(): Promise<Cat[]> {
    return this.catModel.findAll()
  }

  findOne(id: number): Promise<Cat> {
    return this.catModel.findOne({
      where: {
        id,
      },
    })
  }

  async remove(id: number): Promise<void> {
    const cat = await this.findOne(id)
    await cat.destroy()
  }
}
