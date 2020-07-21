import { CreateCatDto } from '../dto/create-cat.dto'
import { of } from 'rxjs'
import { Cat } from 'src/graphql.schema'

export class CatsService {
  private index = 1
  private cats = new Array<Cat>()

  constructor() {
    const cat1: Partial<Cat> = {
      id: this.index++,
      name: 'Birch',
      age: 2,
    }
    this.cats.push(cat1)

    const cat2: Partial<Cat> = {
      id: this.index++,
      name: 'Tabby',
      age: 5,
    }
    this.cats.push(cat2)
  }

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat: Partial<Cat> = {
      id: this.index++,
      name: createCatDto.name,
      age: createCatDto.age,
    }
    this.cats.push(cat)
    return of(cat).toPromise()
  }

  findAll(): Promise<Cat[]> {
    return of(this.cats).toPromise()
  }

  findOne(id: number): Promise<Cat> {
    const cat = this.cats.find((cat) => cat.id == id)
    return of(cat).toPromise()
  }
}
