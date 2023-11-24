import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { RoomsController } from './rooms.controller';
import { RoomServiceInterface } from './interface/room-service.interface';
import { RoomServiceSpy } from './test/mock-room-service';

type SutType = {
  sut: RoomsController;
  roomServiceSpy: RoomServiceSpy;
};

const makeSut = async (): Promise<SutType> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule.forRoot(), JwtModule],
    providers: [
      RoomsController,
      {
        provide: 'RoomServiceInterface',
        useClass: RoomServiceSpy,
      },
    ],
  }).compile();

  const sut = module.get<RoomsController>(RoomsController);
  const roomServiceSpy = module.get<RoomServiceInterface>(
    'RoomServiceInterface',
  ) as RoomServiceSpy;

  return { sut, roomServiceSpy };
};

describe('HotelController', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
  });
});
