import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import {
  LoginGithubRequestDto,
  LoginGoogleRequestDto,
  LoginUserRequestDto,
  LoginUserResponseDto,
  RegisterUserRequestDto,
} from './dto';
import { AuthServiceInterface } from './interface';
import { User } from './models/user.model';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthServiceInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: 'AuthServiceInterface',
          useValue: {
            registerUser: jest.fn(),
            loginUser: jest.fn(),
            loginGoogle: jest.fn(),
            loginGithub: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthServiceInterface>('AuthServiceInterface');
  });

  it('should register a new user', async () => {
    const registerDto: RegisterUserRequestDto = {
      fullName: 'Teste Teste',
      email: 'teste@gmail.com',
      password: '12345@Ma',
    };

    const mockUser: Partial<User> = {
      fullName: 'Teste Teste',
      email: 'teste@gmail.com',
    };

    (authService.registerUser as jest.Mock).mockResolvedValue(mockUser);

    const result = await authController.registerUser(registerDto);

    expect(result).toEqual(mockUser);
  });

  it('should handle login error ', async () => {
    const loginDto: LoginUserRequestDto = {
      email: 'teste@gmail.com',
      password: 'Teste@12345',
    };

    (authService.loginUser as jest.Mock).mockImplementation(() => {
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    });

    await expect(authController.loginUser(loginDto)).rejects.toThrowError(
      HttpException,
    );
  });

  it('should login with google credentials', async () => {
    const payload: LoginGoogleRequestDto = {
      email: 'teste@gmail.com',
    };

    const mockResponse: LoginUserResponseDto = {
      access_token: 'token',
    };

    (authService.loginGoogle as jest.Mock).mockResolvedValue(mockResponse);

    const result = await authController.loginGoogle(payload);
    expect(result).toEqual(mockResponse);
  });

  it('should login with github credentials', async () => {
    const payload: LoginGithubRequestDto = {
      fullName: 'Teste Teste',
    };

    const mockResponse: LoginUserResponseDto = {
      access_token: 'token',
    };

    (authService.loginGithub as jest.Mock).mockResolvedValue(mockResponse);

    const result = await authController.loginGithub(payload);
    expect(result).toEqual(mockResponse);
  });
});
