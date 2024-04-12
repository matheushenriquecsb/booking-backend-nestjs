import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

<<<<<<< HEAD
=======
import { username } from '../helpers/validations';
import { ApiProperty } from '@nestjs/swagger';

>>>>>>> d923bada4d46ecf8e53dcd9d20e826d480eeaf01
export class RegisterUserRequestDto {
  @ApiProperty({
    example: 'matheus.batista',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'matheus@teste.com',
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

<<<<<<< HEAD
=======
  @ApiProperty({
    example: 'Teste@12345',
    required: true,
  })
>>>>>>> d923bada4d46ecf8e53dcd9d20e826d480eeaf01
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
<<<<<<< HEAD
=======

  @ApiProperty({
    example: 'true',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;
>>>>>>> d923bada4d46ecf8e53dcd9d20e826d480eeaf01
}
