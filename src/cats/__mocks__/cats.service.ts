import { CreateCatDto } from '../dto/create-cat.dto'
import { Cat } from '../cat.model'
import { of } from 'rxjs'

export class CatsService {
  private cats = new Array<Cat>()

  constructor() {
    const cat1 = new Cat()
    cat1.name = 'Birch'
    cat1.age = 2
    this.cats.push(cat1)

    const cat2 = new Cat()
    cat2.name = 'Tabby'
    cat2.age = 5
    this.cats.push(cat2)
  }

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = new Cat()
    cat.name = createCatDto.name
    cat.age = createCatDto.age
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
