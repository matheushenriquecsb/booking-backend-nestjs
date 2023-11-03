import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './model/room.model';
import { Hotel, HotelSchema } from 'src/hotels/models/hotel.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Hotel.name, schema: HotelSchema },
    ]),
  ],
  controllers: [RoomsController],
  providers: [
    {
      provide: 'RoomServiceInterface',
      useClass: RoomsService,
    },
  ],
  exports: [
    {
      provide: 'RoomServiceInterface',
      useClass: RoomsService,
    },
  ],
})
export class RoomsModule {}
