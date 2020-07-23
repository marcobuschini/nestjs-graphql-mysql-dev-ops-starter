import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCatDto } from './dto/create-cat.dto'
import { Cat } from './cat.entity'

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    public readonly catRepository: Repository<Cat>
  ) {}

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = new Cat()
    cat.age = createCatDto.age
    cat.name = createCatDto.name

    return this.catRepository.save(cat)
  }

  findAll(): Promise<Cat[]> {
    return this.catRepository.find()
  }

  findOne(id: number): Promise<Cat> {
    return this.catRepository.findOne({
      where: {
        id,
      },
    })
  }

  async remove(id: number): Promise<void> {
    const cat = await this.findOne(id)
    await this.catRepository.remove(cat)
  }
}
