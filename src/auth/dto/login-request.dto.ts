import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class LoginUserRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  password: string;
}
