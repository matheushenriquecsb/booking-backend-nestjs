/* eslint-disable @typescript-eslint/no-unused-vars */
import { RegisterUserRequestDto } from '../dto';
import { User } from '../models/user.model';

export class AuthServiceSpy {
  async register(registerDto: RegisterUserRequestDto): Promise<Partial<User>> {
    return Promise.resolve(mockRegisterResponse());
  }
}

export const mockRegisterResponse = () => ({
  username: 'Teste',
  email: 'test@gmail.com',
  country: 'Brasil',
  city: 'Salvador',
  phone: '71991910098',
  img: '',
  password: '$2b$10$7nDjYXH1zuLRsXuRTkXYd.beejRPpGp4uF2jwpHc4ZDGbz5d4vgBy',
  isAdmin: true,
});
