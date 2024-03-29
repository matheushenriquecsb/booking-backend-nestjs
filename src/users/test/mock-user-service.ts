import { RegisterUserRequestDto } from 'src/auth/dto';
import { UserServiceInterface } from '../interface';
import { User } from 'src/auth/models/user.model';
import { UpdateUserDto } from '../dto';

export class UserServiceSpy implements UserServiceInterface {
  id = null;
  user = null;
  findAllUsers(): Promise<Partial<User[]>> {
    return Promise.resolve(mockResponseUser);
  }

  findOneUser(id: string): Promise<User> {
    this.id = id;

    return Promise.resolve({
      username: 'carloss',
      email: 'carlos@gmail.com',
      password: '123456M@a',
      isAdmin: true,
    });
  }

  removeUser(id: string): Promise<void> {
    this.id = id;
    return Promise.resolve();
  }

  updateUser(id: string, user: UpdateUserDto): Promise<User> {
    this.id = id;
    this.user = user;

    return Promise.resolve({
      username: 'carloss',
      email: 'carlos@gmail.com',
      password: '123456M@a',
      isAdmin: true,
    });
  }
}

export const mockResponseUser: RegisterUserRequestDto[] = [
  {
    username: 'carloss',
    email: 'carlos@gmail.com',
    password: '123456M@a',
    isAdmin: true,
  },
  {
    username: 'carloss',
    email: 'carlos@gmail.com',
    password: '123456M@a',
    isAdmin: true,
  },
];
