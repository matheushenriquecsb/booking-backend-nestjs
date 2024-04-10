import { CreateHotelDto, UpdateHotelDto } from '../dto';
import { Hotel } from '../models/hotel.model';

export interface HotelServiceInterface {
  createHotel(createHotelDto: CreateHotelDto): Promise<Hotel>;

  findOneHotel(hotelId: string): Promise<Hotel>;

  getHotels(): Promise<Hotel[]>;

  getHotelsRooms(hotelId: string);

  getHotelsType(): Promise<Array<object>>;

  getHotelsByCity(cities: string): Promise<Array<number>>;

  updateHotel(hotelId: string, updateHotelDto: UpdateHotelDto): Promise<Hotel>;

  removeHotel(hotelId: string): Promise<void>;
}
