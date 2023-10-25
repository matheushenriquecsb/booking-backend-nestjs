import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserRequestDto } from '../../auth/dto/index';

export class UpdateUserDto extends PartialType(RegisterUserRequestDto) {}
