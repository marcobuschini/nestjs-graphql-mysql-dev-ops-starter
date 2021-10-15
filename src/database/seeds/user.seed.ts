import { User } from '../../users/user.entity'
import { Seeder, Factory } from 'typeorm-seeding'
import { Connection } from 'typeorm'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    process.stderr.write("Loading user's fixtures")
    const users = await factory(User)().makeMany(10)
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(users)
      .execute()
  }
}
