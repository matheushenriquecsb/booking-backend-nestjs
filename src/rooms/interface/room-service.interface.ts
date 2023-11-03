import { RoomRequestDto } from '../dto/room-request.dto';
import { UpdateRoomDto } from '../dto/room-update.dto';
import { Room } from '../model/room.model';

export interface RoomServiceInterface {
  createRoom(hotelId: string, roomDto: RoomRequestDto): Promise<Partial<Room>>;

  getRooms(): Promise<Room[]>;

  getRoomById(id: string): Promise<Room>;

  updateRoom(id: string, roomUpdateDto: UpdateRoomDto): Promise<Room>;

  deleteRoom(id: string, hotel: string): Promise<void>;
}
