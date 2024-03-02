import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
} from 'class-validator';

import { username } from '../helpers/validations';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  @Matches(username)
  username: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @MaxLength(12)
  password: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;
}
