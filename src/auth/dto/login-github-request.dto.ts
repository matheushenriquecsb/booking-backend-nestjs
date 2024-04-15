import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginGithubRequestDto {
  @ApiProperty({
    example: 'Matheus Henrique',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;
}
