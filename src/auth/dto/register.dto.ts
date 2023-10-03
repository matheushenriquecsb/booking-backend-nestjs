import {
  IsBoolean,
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  IsStrongPassword,
  Matches,
  IsPhoneNumber,
} from 'class-validator';
import { username } from '../helpers/validations';

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  @Matches(username)
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsString()
  img: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @MaxLength(12)
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;
}
