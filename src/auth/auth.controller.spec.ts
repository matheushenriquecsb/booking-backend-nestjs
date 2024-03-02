import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginUserRequestDto, RegisterUserRequestDto } from './dto';
import { AuthServiceInterface } from './interface';
import { AuthServiceSpy } from './test';

type SutType = {
  sut: AuthController;
  authServiceSpy: AuthServiceSpy;
};

const makeSut = async (): Promise<SutType> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      AuthController,
      {
        provide: 'AuthServiceInterface',
        useClass: AuthServiceSpy,
      },
    ],
  }).compile();

  const sut = module.get<AuthController>(AuthController);
  const authServiceSpy = module.get<AuthServiceInterface>(
    'AuthServiceInterface',
  ) as AuthServiceSpy;

  return { sut, authServiceSpy };
};

describe('AuthController', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
  });

  it('should create a register', async () => {
    const { sut } = await makeSut();

    const payload: RegisterUserRequestDto = {
      username: 'Teste',
      email: 'test@gmail.com',
      password: '$2b$10$7nDjYXH1zuLRsXuRTkXYd.beejRPpGp4uF2jwpHc4ZDGbz5d4vgBy',
      isAdmin: true,
    };

    const response = await sut.registerUser(payload);

    expect(payload).toEqual(response);
  });

  it('should login a user', async () => {
    const { sut } = await makeSut();

    const payload: LoginUserRequestDto = {
      username: 'Teste',
      password: 'test@gmail.com',
    };

    const response = await sut.loginUser(payload);

    expect(response).toEqual({ access_token: 'Teste' });
  });
});
