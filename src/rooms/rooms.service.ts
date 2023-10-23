import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './model/room.model';
import { Model } from 'mongoose';
import { Hotel } from 'src/hotels/models/hotel.model';
import { RoomRequestDto } from './dto/room-request.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Hotel.name) private hotelModel: Model<Hotel>,
  ) {}

  async createRoom(hotelId: string, roomDto: RoomRequestDto) {
    const hotel = await this.hotelModel.findOne({ _id: hotelId });
    if (!hotel) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Hotel not found',
      });
    }

    const room = await this.roomModel.create(roomDto);

    const hotelRoom = await this.hotelModel.findByIdAndUpdate(hotelId, {
      $push: { rooms: room._id },
    });

    return hotelRoom;
  }

  async getRooms(): Promise<Room[]> {
    const rooms = await this.roomModel.find();

    return rooms;
  }

  async getRoomById(roomId: string): Promise<Room> {
    const room = await this.roomModel.findById({ _id: roomId });

    if (!room) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Room not found',
      });
    }

    return room;
  }

  async deleteRoom(roomId: string, hotelId: string): Promise<void> {
    const hotel = await this.hotelModel.findById({ _id: hotelId });
    if (!hotel) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Hotel not found',
      });
    }

    console.log(hotel);

    const room = await this.roomModel.findById({ _id: roomId });
    if (!room) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Room not found',
      });
    }

    console.log(room);

    await this.roomModel.deleteOne({ _id: roomId });

    try {
      await this.hotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: roomId },
      });
    } catch (error) {}
  }
}
