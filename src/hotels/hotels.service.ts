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

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<Hotel>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createHotelDto: CreateHotelDto) {
    try {
      const hotel = await this.hotelModel.create(createHotelDto);
      return hotel;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
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

  async update(id: string, updateHotelDto: UpdateHotelDto) {
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

  async remove(id: string) {
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

  private async getHotelFromCache(cacheKey: string): Promise<Partial<Hotel>> {
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
