import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

import { AuthService } from './auth.service';
import {
  LoginGithubRequestDto,
  LoginGoogleRequestDto,
  LoginUserRequestDto,
  LoginUserResponseDto,
  RegisterUserRequestDto,
} from './dto';
import { User } from './models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let authModel: Model<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authModel = module.get<Model<User>>(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should register new user', async () => {
    const payload: RegisterUserRequestDto = {
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'test@Password',
    };

    const response: Partial<User> = {
      fullName: 'John Doe',
      email: 'john@example.com',
    };

    (authModel.findOne as jest.Mock).mockResolvedValue(null);

    const newUser = { fullName: 'John Doe', email: 'john@example.com' };

    (authModel.create as jest.Mock).mockResolvedValue(newUser);

    const result = await service.registerUser(payload);

    expect(result).toEqual(response);
  });

  it('should throw NotFoundException when trying to login with an unregistered email', async () => {
    const payload: LoginUserRequestDto = {
      email: 'john@example.com',
      password: 'test@Password',
    };

    (authModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(service.loginUser(payload)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should login google', async () => {
    const payload: LoginGoogleRequestDto = {
      email: 'john@example.com',
    };

    const user = { id: '123', email: payload.email };

    (authModel.findOne as jest.Mock).mockResolvedValue(user);

    await service.loginGoogle(payload);

    expect(authModel.findOne).toHaveBeenCalledWith({ email: payload.email });
  });

  it('should login github', async () => {
    const payload: LoginGithubRequestDto = {
      fullName: 'John Test',
    };

    const user = {
      id: 'user123',
      fullName: 'John Doe',
    };

    (authModel.findOne as jest.Mock).mockResolvedValue(user);
    (jwtService.signAsync as jest.Mock).mockResolvedValue('mockedToken');

    const result: LoginUserResponseDto = await service.loginGithub(payload);

    expect(authModel.findOne).toHaveBeenCalledWith({
      fullName: payload.fullName,
    });
    expect(jwtService.signAsync).toHaveBeenCalledWith({ id: user.id });
    expect(result.access_token).toBe('mockedToken');
  });
});
