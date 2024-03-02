import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomRequestDto {
  @ApiProperty({
    example: 'Teste',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 120,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 2,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  maxPeople: number;

  @ApiProperty({
    example: 'Very Good',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  desc: string;

  @ApiProperty({
    example: 403,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  roomNumber: number;
}
