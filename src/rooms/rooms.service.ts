import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './model/room.model';
import { Model } from 'mongoose';
import { Hotel } from 'src/hotels/models/hotel.model';
import { RoomRequestDto } from './dto/room-request.dto';
import { RoomServiceInterface } from './interface/room-service.interface';
import { UpdateRoomDto } from './dto/room-update.dto';

@Injectable()
export class RoomsService implements RoomServiceInterface {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Hotel.name) private hotelModel: Model<Hotel>,
  ) {}

  async createRoom(
    hotelId: string,
    roomDto: RoomRequestDto,
  ): Promise<Partial<Room>> {
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

  async updateRoom(roomId: string, updateDto: UpdateRoomDto): Promise<Room> {
    const roomUpdated = await this.roomModel.findOneAndUpdate(
      { _id: roomId },
      { $set: updateDto },
      { new: true },
    );

    if (!roomUpdated) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Room not found',
      });
    }

    return roomUpdated;
  }

  async deleteRoom(roomId: string, hotelId: string): Promise<void> {
    const hotel = await this.hotelModel.findById({ _id: hotelId });
    if (!hotel) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Hotel not found',
      });
    }

    const room = await this.roomModel.findById({ _id: roomId });
    if (!room) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Room not found',
      });
    }

    await this.roomModel.deleteOne({ _id: roomId });

    try {
      await this.hotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: roomId },
      });
    } catch (error) {}
  }
}
