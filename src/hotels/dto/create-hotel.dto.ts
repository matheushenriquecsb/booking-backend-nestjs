import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateHotelDto {
  @ApiProperty({
    example: 'Teste Hotel',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Hotel',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    example: 'Salvador',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    example: 'Rua Teste, 16',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: '15',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  distance: string;

  @ApiProperty({
    example: 'teste photos',
    required: true,
  })
  @IsOptional()
  @IsString()
  photos: string[];

  @ApiProperty({
    example: 'Teste',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Muito Bom',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  desc: string;

  @ApiProperty({
    example: '3',
    required: false,
  })
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: 'teste',
    required: false,
  })
  @IsOptional()
  @IsString()
  rooms: string[];

  @ApiProperty({
    example: '100',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  cheapestPrice: number;

  @ApiProperty({
    example: 'true',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  featured: boolean;
}
