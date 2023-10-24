import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserRequestDto } from 'src/auth/dto';

export class UpdateUserDto extends PartialType(RegisterUserRequestDto) {}
