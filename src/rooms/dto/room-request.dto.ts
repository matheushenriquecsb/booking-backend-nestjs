import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  maxPeople: number;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNumber()
  @IsNotEmpty()
  roomNumber: number;
}
