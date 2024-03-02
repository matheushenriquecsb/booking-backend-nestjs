import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class LoginUserRequestDto {
  @ApiProperty({
    example: 'matheus.batista',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  username: string;

  @ApiProperty({
    example: 'Teste@12345',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  password: string;
}
