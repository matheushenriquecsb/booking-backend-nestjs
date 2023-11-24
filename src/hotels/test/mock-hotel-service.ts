import { HotelServiceInterface } from '../interface';
import { CreateHotelDto, UpdateHotelDto } from '../dto';
import { Hotel } from '../models/hotel.model';

export class HotelServiceSpy implements HotelServiceInterface {
  id = null;
  payload = null;

  createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
    this.payload = createHotelDto;
    return Promise.resolve(mockResponseHotel);
  }

  findOneHotel(hotelId: string): Promise<Hotel> {
    this.id = hotelId;
    return Promise.resolve(mockResponseHotel);
  }

  getHotels(): Promise<Hotel[]> {
    return Promise.resolve(mockResponseHotels);
  }

  getHotelsRooms(hotelId: string) {
    this.id = hotelId;
    return null;
  }

  getHotelsType() {
    return Promise.resolve(mockResponseCountByType);
  }

  getHotelsByCity(cities: string) {
    return null;
  }

  updateHotel(hotelId: string, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
    this.id = hotelId;
    this.payload = updateHotelDto;
    return Promise.resolve({
      id: 1,
      name: 'Hotel Atualizado',
      type: 'Test',
      city: 'Salvador',
      address: 'Itapua',
      distance: '40',
      photos: [],
      title: 'Very Good',
      desc: 'Hotel description',
      rating: 5,
      rooms: [],
      cheapestPrice: 34,
      featured: true,
    });
  }

  removeHotel(hotelId: string): Promise<void> {
    this.id = hotelId;
    return null;
  }
}

export const mockResponseHotel = {
  id: '1',
  name: 'Hotel Test',
  type: 'Test',
  city: 'Salvador',
  address: 'Itapua',
  distance: '40',
  photos: [],
  title: 'Very Good',
  desc: 'Hotel description',
  rating: 5,
  rooms: [],
  cheapestPrice: 34,
  featured: true,
};

export const mockResponseHotels: Hotel[] = [
  {
    name: 'Hotel Test',
    type: 'Test',
    city: 'Salvador',
    address: 'Itapua',
    distance: '40',
    photos: [],
    title: 'Very Good',
    desc: 'Hotel description',
    rating: 5,
    rooms: [],
    cheapestPrice: 34,
    featured: true,
  },
  {
    name: 'Hotel Test1',
    type: 'Test',
    city: 'Salvador',
    address: 'Itapua',
    distance: '40',
    photos: [],
    title: 'Very Good',
    desc: 'Hotel description',
    rating: 5,
    rooms: [],
    cheapestPrice: 34,
    featured: true,
  },
];

export const mockResponseCountByType = [
  { type: 'hotel', count: 2 },
  { type: 'apartments', count: 3 },
  { type: 'resorts', count: 4 },
  { type: 'villas', count: 3 },
  { type: 'cabins', count: 2 },
];
