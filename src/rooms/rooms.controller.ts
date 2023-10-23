import { Body, Controller, Post, Param, Get, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomRequestDto } from './dto/room-request.dto';
import { Room } from './model/room.model';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('/:hotelid')
  async createRoom(
    @Param('hotelid') hotelId: string,
    @Body() roomDto: RoomRequestDto,
  ): Promise<Partial<Room>> {
    return this.roomsService.createRoom(hotelId, roomDto);
  }

  @Get()
  async getRooms(): Promise<Room[]> {
    return this.roomsService.getRooms();
  }

  @Get('/:roomid')
  async getRoom(@Param('roomid') roomId: string): Promise<Room> {
    return this.roomsService.getRoomById(roomId);
  }

  @Delete('/:roomid/:hotelid')
  async deleteRoom(
    @Param('roomid') roomId: string,
    @Param('hotelid') hotelId: string,
  ): Promise<void> {
    return this.roomsService.deleteRoom(roomId, hotelId);
  }
}
