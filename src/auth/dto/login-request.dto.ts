import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserRequestDto {
  @ApiProperty({
    example: 'matheus.teste@gmail.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Teste@12345',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
