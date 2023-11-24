import { RoomRequestDto } from '../dto/room-request.dto';
import { UpdateRoomDto } from '../dto/room-update.dto';
import { RoomServiceInterface } from '../interface/room-service.interface';
import { Room } from '../model/room.model';

export class RoomServiceSpy implements RoomServiceInterface {
  id = null;
  payload = null;

  createRoom(hotelId: string, roomDto: RoomRequestDto): Promise<Partial<Room>> {
    this.id = hotelId;
    this.payload = roomDto;
    return;
  }

  getRooms(): Promise<Room[]> {
    return Promise.resolve(mockResponseRoom);
  }

  getRoomById(id: string): Promise<Room> {
    this.id = id;
    return;
  }

  updateRoom(id: string, roomUpdateDto: UpdateRoomDto): Promise<Room> {
    this.id = id;
    this.payload = roomUpdateDto;
    return;
  }

  deleteRoom(id: string, roomDto: string): Promise<void> {
    this.id = id;
    this.payload = roomDto;
    return;
  }
}

export const mockResponseRoom = [
  {
    title: 'test',
    price: 54,
    maxPeople: 2,
    desc: 'test',
    roomNumbers: [{ number: 101 }, { number: 102 }],
  },
  {
    title: 'test',
    price: 54,
    maxPeople: 2,
    desc: 'test',
    roomNumbers: [{ number: 101 }, { number: 102 }],
  },
];
