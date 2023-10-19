import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './models/hotel.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HotelsService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<Hotel>) {}

  async create(createHotelDto: CreateHotelDto) {
    try {
      const hotel = await this.hotelModel.create(createHotelDto);
      return hotel;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    const hotel = await this.hotelModel.findOne({ _id: id }).exec();
    if (!hotel) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Hotel not found',
      });
    }

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
}
