import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';
import {
  LoginAuthRequestDto,
  RegisterAuthRequestDto,
  RegisterAuthResponseDto,
} from './dto';
import LoginAuthResponseDto from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(
    @Body() registerDto: RegisterAuthRequestDto,
  ): Promise<RegisterAuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Body() loginDto: LoginAuthRequestDto,
  ): Promise<LoginAuthResponseDto> {
    return this.authService.login(loginDto);
  }
}
