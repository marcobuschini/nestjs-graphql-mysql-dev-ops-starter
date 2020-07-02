import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.model';
import { of } from 'rxjs';

describe('UsersController', () => {
  let usersController: UsersController;
  const user1 = new User()
  user1.firstName = 'First Name 1'
  user1.lastName = 'Last Name 1'

  const user2 = new User()
  user2.firstName = 'First Name 2'
  user2.lastName = 'Last Name 2'


  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: {
          findAll: jest
            .fn()
            .mockReturnValue(of([
              User.create(user1),
              User.create(user2)
            ]).toPromise()),
          findOne: jest
            .fn()
            .mockReturnValue(of(user1).toPromise()),
          create: jest
            .fn()
            .mockReturnValue(user2),
          remove: jest.fn().mockReturnValue(of(null).toPromise()),
        }
      }],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('findAll()', () => {
      expect(usersController.findAll()).resolves.toBe([user1, user2]);
    });

    it('findOne()', () => {
      expect(usersController.findAll()).resolves.toBe(user1);
    });

    it('create()', () => {
      expect(usersController.create({firstName: user1.firstName, lastName: user1.lastName})).resolves.toBe(user1);
    });

    it('remove()', () => {
      expect(usersController.remove('user1')).resolves.toBe(user1);
    });
  });
});