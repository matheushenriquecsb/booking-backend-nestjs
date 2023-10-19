import { PartialType } from '@nestjs/mapped-types';
import { RegisterAuthRequestDto } from 'src/auth/dto';

export class UpdateUserDto extends PartialType(RegisterAuthRequestDto) {}
