import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthServiceSpy } from './test';
import { RegisterAuthRequestDto } from './dto';

type SutType = {
  sut: AuthController;
  authServiceSpy: AuthServiceSpy;
};

const makeSut = async (): Promise<SutType> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      AuthController,
      {
        provide: AuthService,
        useClass: AuthServiceSpy,
      },
    ],
  }).compile();

  const sut = module.get<AuthController>(AuthController);
  const authServiceSpy = module.get<AuthService>(AuthService) as AuthServiceSpy;

  return { sut, authServiceSpy };
};

describe('AuthController', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
  });

  it('shoulde create a register', async () => {
    const { sut } = await makeSut();

    const payload: RegisterAuthRequestDto = {
      username: 'Teste',
      email: 'test@gmail.com',
      country: 'Brasil',
      city: 'Salvador',
      phone: '71991910098',
      img: '',
      password: '$2b$10$7nDjYXH1zuLRsXuRTkXYd.beejRPpGp4uF2jwpHc4ZDGbz5d4vgBy',
      isAdmin: true,
    };

    const response = await sut.register(payload);

    expect(payload).toEqual(response);
  });
});
