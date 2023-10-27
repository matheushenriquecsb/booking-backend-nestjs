import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { UserServiceInterface } from './interface';
import { UserServiceSpy, mockResponseUser } from './test/mock-user-service';
import { UsersController } from './users.controller';

type SutType = {
  sut: UsersController;
  userServiceSpy: UserServiceSpy;
};

const makeSut = async (): Promise<SutType> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule.forRoot(), JwtModule],
    providers: [
      UsersController,
      {
        provide: 'UserServiceInterface',
        useClass: UserServiceSpy,
      },
    ],
  }).compile();

  const sut = module.get<UsersController>(UsersController);
  const userServiceSpy = module.get<UserServiceInterface>(
    'UserServiceInterface',
  ) as UserServiceSpy;

  return { sut, userServiceSpy };
};

describe('UserController', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
  });

  it('should return all user successfully -> /GET /users', async () => {
    const { sut } = await makeSut();

    const response = await sut.findAllUsers();

    expect(response).toEqual(mockResponseUser);
  });

  it('should return one user successfully -> /GET /users/:id', async () => {
    const { sut, userServiceSpy } = await makeSut();

    const userId = '1';

    const response = await sut.findOneUser(userId);

    expect(userServiceSpy.id).toEqual(userId);
    expect(response).toEqual({
      username: 'carloss',
      email: 'carlos@gmail.com',
      country: 'France',
      city: 'paris',
      phone: '75991918877',
      img: '',
      password: '123456M@a',
      isAdmin: true,
    });
  });

  it('should update a user successfully -> /PACTH /users/:id', async () => {
    const { sut, userServiceSpy } = await makeSut();

    const userId = '1';

    const payload = {
      username: 'carloss',
      email: 'carlos@gmail.com',
      country: 'France',
      city: 'paris',
      phone: '75991918877',
      img: '',
      password: '123456M@a',
      isAdmin: true,
    };

    const response = await sut.updateUser(userId, payload);

    expect(userServiceSpy.id).toEqual(userId);
    expect(response).toEqual({
      username: 'carloss',
      email: 'carlos@gmail.com',
      country: 'France',
      city: 'paris',
      phone: '75991918877',
      img: '',
      password: '123456M@a',
      isAdmin: true,
    });
  });

  it('should remove a user successfully -> /DELETE /users/:id', async () => {
    const { sut, userServiceSpy } = await makeSut();

    const userId = '1';

    const response = await sut.removeUser(userId);

    expect(userServiceSpy.id).toEqual(userId);
    expect(response).toBeUndefined();
  });
});
