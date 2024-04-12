import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AuthService } from './auth.service';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { RegisterUserRequestDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        JwtService,
        AuthService,

        {
          provide: getModelToken('User'),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  it('should create new user', async () => {
    const payload: RegisterUserRequestDto = {
      username: 'existinguser',
      email: 'new@example.com',
      password: 'testpassword',
      isAdmin: false,
    };

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const createdUser = {
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
      isAdmin: payload.isAdmin,
    };

    const { username, email } = createdUser;

    jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);

    const result = await service.registerUser(payload);
    expect(result).toEqual({
      username,
      email,
    });
  });
});