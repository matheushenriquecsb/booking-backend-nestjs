import { CreateHotelDto, UpdateHotelDto } from '../dto';
import { Hotel } from '../models/hotel.model';

export interface HotelServiceInterface {
  createHotel(createHotelDto: CreateHotelDto): Promise<Hotel>;

  findOneHotel(hotelId: string);

  getHotel(city: string);

  getHotels(featured: string, limit: string);

  getHotelsRooms(hotelId: string);

  getHotelsType();

  getHotelsByCity(cities: string);

  updateHotel(hotelId: string, updateHotelDto: UpdateHotelDto): Promise<Hotel>;

  removeHotel(hotelId: string): Promise<void>;
}
