import { User } from '../../users/user.entity'
import { define } from 'typeorm-seeding'

define(User, (faker: Faker.FakerStatic) => {
  const gender = faker.random.number(1)

  const user = new User()
  user.firstName = faker.name.firstName(gender)
  user.lastName = faker.name.lastName(gender)
  user.username = faker.internet.userName(user.firstName, user.lastName)
  user.password = user.username
  user.isActive = true
  return user
})
