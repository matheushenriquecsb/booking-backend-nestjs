import { PartialType } from '@nestjs/mapped-types';
import { RoomRequestDto } from './room-request.dto';

export class UpdateRoomDto extends PartialType(RoomRequestDto) {}
