import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { RoomRequestDto } from './dto/room-request.dto';
import { RoomServiceInterface } from './interface/room-service.interface';
import { Room } from './model/room.model';
import { AuthGuard } from '../config/guards/permissions.guard';
import { UpdateRoomDto } from './dto/room-update.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('rooms')
export class RoomsController {
  constructor(
    @Inject('RoomServiceInterface')
    private readonly roomsService: RoomServiceInterface,
  ) {}

  @ApiTags('Rooms')
  @Post('/:hotelid')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createRoom(
    @Param('hotelid') hotelId: string,
    @Body() roomDto: RoomRequestDto,
  ): Promise<Partial<Room>> {
    return this.roomsService.createRoom(hotelId, roomDto);
  }

  @ApiTags('Rooms')
  @HttpCode(HttpStatus.OK)
  @Get()
  async getRooms(): Promise<Room[]> {
    return this.roomsService.getRooms();
  }

  @ApiTags('Rooms')
  @HttpCode(HttpStatus.OK)
  @Get('/:roomid')
  async getRoom(@Param('roomid') roomId: string): Promise<Room> {
    return this.roomsService.getRoomById(roomId);
  }

  @ApiTags('Rooms')
  @HttpCode(HttpStatus.OK)
  @Patch('/:roomid')
  async updateRoom(
    @Body() roomUpdateDto: UpdateRoomDto,
    @Param('roomid') roomId: string,
  ): Promise<Room> {
    return this.roomsService.updateRoom(roomId, roomUpdateDto);
  }

  @ApiTags('Rooms')
  @HttpCode(HttpStatus.OK)
  @Delete('/:roomid/:hotelid')
  async deleteRoom(
    @Param('roomid') roomId: string,
    @Param('hotelid') hotelId: string,
  ): Promise<void> {
    return this.roomsService.deleteRoom(roomId, hotelId);
  }
}
