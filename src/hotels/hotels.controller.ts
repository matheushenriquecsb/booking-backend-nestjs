import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common';

import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { AuthGuard } from '../config/guards/permissions.guard';
import { HotelServiceInterface } from './interface';
import { Hotel } from './models/hotel.model';
import { ApiTags } from '@nestjs/swagger';

@Controller('hotels')
export class HotelsController {
  constructor(
    @Inject('HotelServiceInterface')
    private readonly hotelsService: HotelServiceInterface,
  ) {}

  @ApiTags('Hotels')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post()
  createHotel(@Body() createHotelDto: CreateHotelDto): Promise<Hotel> {
    return this.hotelsService.createHotel(createHotelDto);
  }

  @ApiTags('Hotels')
  @HttpCode(HttpStatus.OK)
  @Get('/find/:hotelId')
  findOneHotel(@Param('hotelId') hotelId: string): Promise<Hotel> {
    return this.hotelsService.findOneHotel(hotelId);
  }

  @ApiTags('Hotels')
  @HttpCode(HttpStatus.OK)
  @Get()
  getHotels(@Query('city') city: string): Promise<Hotel[]> {
    return this.hotelsService.getHotels(city);
  }

  @ApiTags('Hotels')
  @HttpCode(HttpStatus.OK)
  @Get('/countByType')
  getHotelsType(): Promise<Partial<Hotel>> {
    return this.hotelsService.getHotelsType();
  }

  @ApiTags('Hotels')
  @HttpCode(HttpStatus.OK)
  @Get('/countByCity')
  getHotelsByCity(@Query('cities') cities: string) {
    return this.hotelsService.getHotelsByCity(cities);
  }

  @ApiTags('Hotels')
  @HttpCode(HttpStatus.OK)
  @Get('/room/:hotelid')
  getHotelsRooms(@Param('hotelid') hotelId: string) {
    return this.hotelsService.getHotelsRooms(hotelId);
  }

  @ApiTags('Hotels')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Patch(':hotelId')
  update(
    @Param('hotelId') hotelId: string,
    @Body() updateHotelDto: UpdateHotelDto,
  ): Promise<Hotel> {
    return this.hotelsService.updateHotel(hotelId, updateHotelDto);
  }

  @ApiTags('Hotels')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete(':hotelId')
  removeHotel(@Param('hotelId') hotelId: string): Promise<void> {
    return this.hotelsService.removeHotel(hotelId);
  }
}
