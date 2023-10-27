import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { Hotel, HotelSchema } from './models/hotel.model';
import { Room, RoomSchema } from 'src/rooms/model/room.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  controllers: [HotelsController],
  providers: [
    {
      provide: 'HotelServiceInterface',
      useClass: HotelsService,
    },
  ],
  exports: [
    {
      provide: 'HotelServiceInterface',
      useClass: HotelsService,
    },
  ],
})
export class HotelsModule {}
