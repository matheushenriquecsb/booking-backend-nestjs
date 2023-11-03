import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';

import { CreateHotelDto, UpdateHotelDto } from './dto';
import { Hotel } from './models/hotel.model';
import { HotelServiceInterface } from './interface';
import { Room } from 'src/rooms/model/room.model';

@Injectable()
export class HotelsService implements HotelServiceInterface {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Hotel.name) private hotelModel: Model<Hotel>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
    try {
      const hotel = await this.hotelModel.create(createHotelDto);
      return hotel;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOneHotel(id: string): Promise<Hotel> {
    const hotelFromCache = await this.getHotelFromCache(id);

    if (hotelFromCache) {
      return hotelFromCache;
    }

    const hotel = await this.hotelModel.findOne({ _id: id }).exec();
    if (!hotel) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Hotel not found',
      });
    }

    await this.setHotelToCache(`${id}`, hotel);

    return hotel;
  }

  async getHotels(): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }

  async getHotelsRooms(hotelId: string) {
    return;
  }

  async getHotelsByCity(cities: string) {
    const city = cities.split(',');

    const list = await Promise.all(
      city.map((city) => {
        return this.hotelModel.countDocuments({ city: city });
      }),
    );

    return list;
  }

  async getHotelsType() {
    const hotelCount = await this.hotelModel.countDocuments({ type: 'hotel' });
    const apartmentCount = await this.hotelModel.countDocuments({
      type: 'apartment',
    });
    const resortCount = await this.hotelModel.countDocuments({
      type: 'resort',
    });
    const villaCount = await this.hotelModel.countDocuments({ type: 'villa' });
    const cabinCount = await this.hotelModel.countDocuments({ type: 'cabin' });

    return [
      { type: 'hotel', count: hotelCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'resorts', count: resortCount },
      { type: 'villas', count: villaCount },
      { type: 'cabins', count: cabinCount },
    ];
  }

  async updateHotel(
    id: string,
    updateHotelDto: UpdateHotelDto,
  ): Promise<Hotel> {
    const hotel = await this.hotelModel.findOneAndUpdate(
      { _id: id },
      updateHotelDto,
    );

    if (!hotel) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Hotel not found',
      });
    }

    return hotel;
  }

  async removeHotel(id: string): Promise<void> {
    const hotel = await this.hotelModel.findOne({ _id: id });
    if (!hotel) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Hotel not found',
      });
    }
    await this.hotelModel.findByIdAndRemove({ _id: id });
    return;
  }

  private async getHotelFromCache(cacheKey: string): Promise<Hotel> {
    try {
      return await this.cacheManager.get(`${cacheKey}`);
    } catch (error) {
      throw new Error(error);
    }
  }

  private async setHotelToCache(
    cacheKey: string,
    cacheValue: any,
  ): Promise<void> {
    try {
      await this.cacheManager.set(`${cacheKey}`, cacheValue);
    } catch (error) {
      throw new Error(error);
    }
  }
}
