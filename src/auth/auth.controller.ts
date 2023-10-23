import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginAuthRequestDto, RegisterAuthRequestDto } from './dto';
import LoginAuthResponseDto from './dto/login-response.dto';
import { Auth } from './models/auth.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(
    @Body() registerDto: RegisterAuthRequestDto,
  ): Promise<Partial<Auth>> {
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
