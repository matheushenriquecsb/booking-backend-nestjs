import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { HotelsController } from './hotels.controller';
import {
  HotelServiceSpy,
  mockResponseGetHotels,
} from './test/mock-hotel-service';
import { HotelServiceInterface } from './interface';

type SutType = {
  sut: HotelsController;
  userServiceSpy: HotelServiceSpy;
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
  const userServiceSpy = module.get<HotelServiceInterface>(
    'HotelServiceInterface',
  ) as unknown as HotelServiceSpy;

  return { sut, userServiceSpy };
};

describe('UserController', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
  });

  it('should return all hotels successfully -> /GET /users', async () => {
    const { sut } = await makeSut();

    const response = await sut.getHotels();

    expect(response).toEqual(mockResponseGetHotels);
  });
});
