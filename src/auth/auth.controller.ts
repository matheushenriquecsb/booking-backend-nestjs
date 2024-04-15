import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

import {
  LoginGithubRequestDto,
  LoginGoogleRequestDto,
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

  @ApiTags('Auth')
  @HttpCode(HttpStatus.OK)
  @Post('/login-google')
  async loginGoogle(
    @Body() loginGoogleDto: LoginGoogleRequestDto,
  ): Promise<LoginUserResponseDto> {
    return this.authService.loginGoogle(loginGoogleDto);
  }

  @ApiTags('Auth')
  @HttpCode(HttpStatus.OK)
  @Post('/login-github')
  async loginGithub(
    @Body() loginGoogleDto: LoginGithubRequestDto,
  ): Promise<LoginUserResponseDto> {
    return this.authService.loginGithub(loginGoogleDto);
  }
}
