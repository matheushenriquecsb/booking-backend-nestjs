import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../auth/models/user.model';
import { CacheManagerSpy } from './test/mock-user-cache';
import { UserRepositorySpy } from './test/mock-user-repository';
import { UsersService } from './users.service';

type SutType = {
  sut: UsersService;
  userRepository: UserRepositorySpy;
};

const makeSut = async (): Promise<SutType> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule.forRoot()],
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useClass: UserRepositorySpy,
      },
      {
        provide: CACHE_MANAGER,
        useClass: CacheManagerSpy,
      },
    ],
  }).compile();

  const sut = module.get<UsersService>(UsersService);
  const userRepository = module.get(
    getRepositoryToken(User),
  ) as UserRepositorySpy;

  return { sut, userRepository };
};

describe('UserService', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
  });
});
