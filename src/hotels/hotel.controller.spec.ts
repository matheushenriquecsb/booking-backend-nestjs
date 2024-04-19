import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateHotelDto } from './dto';
import { HotelsController } from './hotels.controller';
import { HotelServiceInterface } from './interface';
import { Hotel } from './models/hotel.model';

describe('HotelController', () => {
  let hotelController: HotelsController;
  let hotelService: HotelServiceInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelsController],
      providers: [
        JwtService,
        {
          provide: 'HotelServiceInterface',
          useValue: {
            createHotel: jest.fn(),
            findOneHotel: jest.fn(),
            getHotel: jest.fn(),
            getHotels: jest.fn(),
            getHotelsType: jest.fn(),
            getHotelsByCity: jest.fn(),
            updateHotel: jest.fn(),
            removeHotel: jest.fn(),
          },
        },
      ],
    }).compile();

    hotelController = module.get<HotelsController>(HotelsController);
    hotelService = module.get<HotelServiceInterface>('HotelServiceInterface');
  });

  it('should register a new hotel', async () => {
    const payload: CreateHotelDto = {
      name: 'Test',
      type: 'Hotel',
      city: 'Salvador',
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

    (hotelService.createHotel as jest.Mock).mockResolvedValue(Hotel);

    const result = await hotelController.createHotel(payload);

    expect(result).toEqual(Hotel);
  });

  it('should get hotel', async () => {
    const payload = '1';

    (hotelService.findOneHotel as jest.Mock).mockResolvedValue(Hotel);

    const result = await hotelController.findOneHotel(payload);

    expect(result).toEqual(Hotel);
  });

  it('should return hotels by city', async () => {
    const mockCity = 'ExampleCity';

    const mockHotel = {
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

    (hotelService.getHotel as jest.Mock).mockResolvedValue(mockHotel);

    const result = await hotelController.getHotel(mockCity);

    expect(hotelService.getHotel).toHaveBeenCalledWith(mockCity);

    expect(result).toEqual(mockHotel);
  });

  it('should return hotel by featured and limit', async () => {
    const mockFeatured = 'true';
    const mockLimit = '4';

    const mockHotel = {
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

    (hotelService.getHotels as jest.Mock).mockResolvedValue(mockHotel);

    await hotelController.getHotels(mockFeatured, mockLimit);

    expect(hotelService.getHotels).toHaveBeenCalledWith(
      mockFeatured,
      mockLimit,
    );
  });

  it('should return an array of objects representing hotel types', async () => {
    const mockHotelTypes = [
      { type: 'Type1', count: 5 },
      { type: 'Type2', count: 10 },
    ];

    (hotelService.getHotelsType as jest.Mock).mockResolvedValue(mockHotelTypes);

    const result = await hotelController.getHotelsType();

    expect(result).toEqual(mockHotelTypes);
  });

  it('should return an array of number representing hotel cities', async () => {
    const cities = 'City1,City2,City3';
    const expectedResult = [10, 20, 15];

    (hotelService.getHotelsByCity as jest.Mock).mockResolvedValue(
      expectedResult,
    );

    const result = await hotelController.getHotelsByCity(cities);

    expect(result).toEqual(expectedResult);
  });

  it('should update a hotel', async () => {
    const hotelId = '1';
    const mockHotel = {
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

    (hotelService.updateHotel as jest.Mock).mockResolvedValue(mockHotel);

    const result = await hotelController.update(hotelId, mockHotel);

    expect(result).toEqual(mockHotel);
  });

  it('should delete a hotel', async () => {
    const hotelId = '1';

    await hotelController.removeHotel(hotelId);

    expect(hotelService.removeHotel).toHaveBeenCalledWith(hotelId);
  });
});
