/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  LoginUserRequestDto,
  LoginUserResponseDto,
  RegisterUserRequestDto,
} from '../dto';
import { AuthServiceInterface } from '../interface';
import { User } from '../models/user.model';

export class AuthServiceSpy implements AuthServiceInterface {
  registerDto = null;
  loginDto = null;

  registerUser(registerDto: RegisterUserRequestDto): Promise<Partial<User>> {
    this.registerDto = registerDto;
    return Promise.resolve(mockRegisterResponse());
  }

  loginUser(loginDto: LoginUserRequestDto): Promise<LoginUserResponseDto> {
    this.loginDto = loginDto;
    return Promise.resolve(mockLoginResponse());
  }
}

export const mockRegisterResponse = () => ({
  username: 'Teste',
  email: 'test@gmail.com',
  password: '$2b$10$7nDjYXH1zuLRsXuRTkXYd.beejRPpGp4uF2jwpHc4ZDGbz5d4vgBy',
  isAdmin: true,
});

export const mockLoginResponse = () => ({
  access_token: 'Teste',
});
