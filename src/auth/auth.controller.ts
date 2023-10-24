import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import {
  LoginUserRequestDto,
  LoginUserResponseDto,
  RegisterUserRequestDto,
} from './dto';
import { User } from './models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(
    @Body() registerDto: RegisterUserRequestDto,
  ): Promise<Partial<User>> {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Body() loginDto: LoginUserRequestDto,
  ): Promise<LoginUserResponseDto> {
    return this.authService.login(loginDto);
  }
}
