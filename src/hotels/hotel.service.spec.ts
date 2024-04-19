import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

import { Room } from '../rooms/model/room.model';
import { CreateHotelDto } from './dto';
import { HotelsService } from './hotels.service';
import { Hotel } from './models/hotel.model';

describe('HotelsService', () => {
  let service: HotelsService;
  let hotelModel: Model<Hotel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelsService,
        JwtService,
        {
          provide: 'JwtService',
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mockedAccessToken'),
          },
        },
        {
          provide: getModelToken(Hotel.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            find: jest.fn(() => ({
              limit: jest.fn(),
            })),
            countDocuments: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
          },
        },
        {
          provide: getModelToken(Room.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            set: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HotelsService>(HotelsService);
    hotelModel = module.get<Model<Hotel>>(getModelToken(Hotel.name));
  });

  it('should register new hotel', async () => {
    const payload: CreateHotelDto = {
      name: 'Test',
      type: 'Hotel',
      city: 'ExampleCity',
      address: 'Teste, 02',
      distance: '123',
      photos: ['Teste1'],
      title: 'Teste',
      desc: 'Teste muito bom',
      rating: 5,
      rooms: ['Teste 1'],
      cheapestPrice: 300,
      featured: true,
    };

    const response = {
      id: '1',
      name: 'Test',
      type: 'Hotel',
      city: 'ExampleCity',
      address: 'Teste, 02',
      distance: '123',
      photos: ['Teste1'],
      title: 'Teste',
      desc: 'Teste muito bom',
      rating: 5,
      rooms: ['Teste 1'],
      cheapestPrice: 300,
      featured: true,
    };

    (hotelModel.create as jest.Mock).mockResolvedValue(response);

    const result = await service.createHotel(payload);

    expect(result).toEqual(response);
  });

  it('should find a hotel', async () => {
    const payload = '1';

    const response = {
      id: '1',
      name: 'Test',
      type: 'Hotel',
      city: 'ExampleCity',
      address: 'Teste, 02',
      distance: '123',
      photos: ['Teste1'],
      title: 'Teste',
      desc: 'Teste muito bom',
      rating: 5,
      rooms: ['Teste 1'],
      cheapestPrice: 300,
      featured: true,
    };

    (hotelModel.findOne as jest.Mock).mockResolvedValue(response);

    const result = await service.findOneHotel(payload);

    expect(result).toEqual(response);
  });

  it('should find hotels by city', async () => {
    const payload = 'City1';

    const expectedResult = [
      { name: 'Hotel1', city: 'City1' },
      { name: 'Hotel2', city: 'City1' },
    ];

    (hotelModel.find as jest.Mock).mockResolvedValue(expectedResult);

    const result = await service.getHotel(payload);

    expect(result).toEqual(expectedResult);
  });

  it('should count hotels by cities', async () => {
    const cities = 'City1,City2';
    const expectedCounts = [10, 20];

    (hotelModel.countDocuments as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(expectedCounts[0]),
    );

    await service.getHotelsByCity(cities);

    expect(hotelModel.countDocuments).toHaveBeenCalledWith({ city: 'City1' });
  });

  it('should count hotels by types', async () => {
    const hotelCount = 10;
    const apartmentCount = 20;
    const resortCount = 15;
    const chaleCount = 5;
    const hostelCount = 8;

    (hotelModel.countDocuments as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve(hotelCount))
      .mockImplementationOnce(() => Promise.resolve(apartmentCount))
      .mockImplementationOnce(() => Promise.resolve(resortCount))
      .mockImplementationOnce(() => Promise.resolve(chaleCount))
      .mockImplementationOnce(() => Promise.resolve(hostelCount));

    await service.getHotelsType();

    expect(hotelModel.countDocuments).toHaveBeenCalledWith({ type: 'hotel' });
    expect(hotelModel.countDocuments).toHaveBeenCalledWith({
      type: 'apartment',
    });
    expect(hotelModel.countDocuments).toHaveBeenCalledWith({ type: 'resort' });
    expect(hotelModel.countDocuments).toHaveBeenCalledWith({ type: 'chalé' });
    expect(hotelModel.countDocuments).toHaveBeenCalledWith({ type: 'hostel' });
  });

  it('should update a hotel', async () => {
    const id = '12345';
    const payload: CreateHotelDto = {
      name: 'Test',
      type: 'Hotel',
      city: 'ExampleCity',
      address: 'Teste, 02',
      distance: '123',
      photos: ['Teste1'],
      title: 'Teste',
      desc: 'Teste muito bom',
      rating: 5,
      rooms: ['Teste 1'],
      cheapestPrice: 300,
      featured: true,
    };

    (hotelModel.findOneAndUpdate as jest.Mock).mockResolvedValue(payload);

    const result = await service.updateHotel(id, payload);

    expect(hotelModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id },
      payload,
    );
    expect(result).toEqual(payload);
  });

  it('should remove a hotel', async () => {
    const id = '12345';
    const hotel = { _id: id, name: 'Hotel1' };

    (hotelModel.findOne as jest.Mock).mockResolvedValueOnce(hotel);
    (hotelModel.findByIdAndRemove as jest.Mock).mockResolvedValueOnce(
      () => null,
    );

    await service.removeHotel(id);

    expect(hotelModel.findOne).toHaveBeenCalledWith({ _id: id });
    expect(hotelModel.findByIdAndRemove).toHaveBeenCalledWith({ _id: id });
  });
});
