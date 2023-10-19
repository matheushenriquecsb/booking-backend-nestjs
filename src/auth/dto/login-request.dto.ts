import { IsString, IsNotEmpty } from 'class-validator';

export class LoginAuthRequestDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
