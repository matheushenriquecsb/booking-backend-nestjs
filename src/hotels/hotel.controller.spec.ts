import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { HotelsController } from './hotels.controller';
import {
  HotelServiceSpy,
  mockResponseCountByType,
  mockResponseHotel,
  mockResponseHotels,
} from './test/mock-hotel-service';
import { HotelServiceInterface } from './interface';
import { CreateHotelDto } from './dto';

type SutType = {
  sut: HotelsController;
  hotelServiceSpy: HotelServiceSpy;
};

const makeSut = async (): Promise<SutType> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule.forRoot(), JwtModule],
    providers: [
      HotelsController,
      {
        provide: 'HotelServiceInterface',
        useClass: HotelServiceSpy,
      },
    ],
  }).compile();

  const sut = module.get<HotelsController>(HotelsController);
  const hotelServiceSpy = module.get<HotelServiceInterface>(
    'HotelServiceInterface',
  ) as HotelServiceSpy;

  return { sut, hotelServiceSpy };
};

describe('HotelController', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
  });

  it('should create hotel successfully -> /POST /hotels', async () => {
    const { sut, hotelServiceSpy } = await makeSut();

    const payload: CreateHotelDto = {
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

    const response = await sut.createHotel(payload);

    expect(hotelServiceSpy.payload).toEqual(payload);
    expect(response).toBe(mockResponseHotel);
  });

  it('should get hotel by id successfully -> /GET /hotels/:id', async () => {
    const { sut, hotelServiceSpy } = await makeSut();

    const hotelId = '1';

    const response = await sut.findOneHotel(hotelId);

    expect(hotelServiceSpy.id).toEqual(hotelId);
    expect(response).toBe(mockResponseHotel);
  });

  it('should get all hotels successfully -> /GET /hotels/ ', async () => {
    const { sut } = await makeSut();

    const response = await sut.getHotels();

    expect(response).toBe(mockResponseHotels);
  });

  it('should get hotels by type successfully -> /GET /hotels/countByType ', async () => {
    const { sut } = await makeSut();

    const response = await sut.getHotelsType();

    expect(response).toBe(mockResponseCountByType);
  });

  it('should update hotel by id successfully -> /PATCH /hotel/:id ', async () => {
    const { sut, hotelServiceSpy } = await makeSut();

    const hotelId = '1';

    const payload = {
      id: '1',
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
    };

    const response = await sut.update(hotelId, payload);

    expect(hotelServiceSpy.id).toBe(hotelId);
    expect(hotelServiceSpy.payload).toEqual(payload);
    expect(response).toEqual({
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
  });

  it('should delete hotel successfully -> /DELETE /hotels/:id ', async () => {
    const { sut } = await makeSut();

    const hotelId = '1';

    const response = await sut.removeHotel(hotelId);

    expect(response).toBeNull();
  });
});
