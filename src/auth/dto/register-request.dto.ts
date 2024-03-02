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
  @ApiProperty({
    example: 'matheus.batista',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  @Matches(username)
  username: string;

  @ApiProperty({
    example: 'matheus@teste.com',
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @ApiProperty({
    example: 'Teste@12345',
    required: true,
  })
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @MaxLength(12)
  password: string;

  @ApiProperty({
    example: 'true',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;
}
