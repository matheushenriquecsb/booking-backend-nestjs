import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

import {
  LoginUserRequestDto,
  LoginUserResponseDto,
  RegisterUserRequestDto,
} from './dto';

import { ApiTags } from '@nestjs/swagger';
import { AuthServiceInterface } from './interface';
import { User } from './models/user.model';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface,
  ) {}

  @ApiTags('Auth')
  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async registerUser(
    @Body() registerDto: RegisterUserRequestDto,
  ): Promise<Partial<User>> {
    return this.authService.registerUser(registerDto);
  }

  @ApiTags('Auth')
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async loginUser(
    @Body() loginDto: LoginUserRequestDto,
  ): Promise<LoginUserResponseDto> {
    return this.authService.loginUser(loginDto);
  }
}
