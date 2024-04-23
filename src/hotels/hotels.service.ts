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
import { Room } from '../rooms/model/room.model';

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

    const hotel = await this.hotelModel.findOne({ _id: id });
    if (!hotel) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Hotel not found',
      });
    }

    await this.setHotelToCache(`${id}`, hotel);

    return hotel;
  }

  async getHotel(city: string) {
    if (city) {
      const hotels = await this.hotelModel.find({ city: city });
      return hotels;
    }
    return this.hotelModel.find().exec();
  }

  async getHotels(featured: string, limit: string) {
    if (featured) {
      const hotels = await this.hotelModel
        .find({ featured: featured })
        .limit(+limit);
      return hotels;
    }
  }

  async getHotelsByCity(cities: string): Promise<Array<number>> {
    const city = cities.split(',');

    try {
      const list = await Promise.all(
        city.map((city) => {
          return this.hotelModel.countDocuments({ city: city });
        }),
      );
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getHotelsType(): Promise<Array<object>> {
    const hotelCount = await this.hotelModel.countDocuments({ type: 'hotel' });
    const apartmentCount = await this.hotelModel.countDocuments({
      type: 'apartment',
    });
    const resortCount = await this.hotelModel.countDocuments({
      type: 'resort',
    });
    const chaleCount = await this.hotelModel.countDocuments({ type: 'chalé' });
    const hostelCount = await this.hotelModel.countDocuments({
      type: 'hostel',
    });

    return [
      { type: 'hotel', count: hotelCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'resort', count: resortCount },
      { type: 'chalé', count: chaleCount },
      { type: 'hostel', count: hostelCount },
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
