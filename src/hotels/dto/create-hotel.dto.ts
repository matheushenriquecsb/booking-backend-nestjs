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
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  distance: string;

  @IsOptional()
  @IsString()
  photos: string[];

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsOptional()
  @IsString()
  rooms: string[];

  @IsNotEmpty()
  @IsNumber()
  cheapestPrice: number;

  @IsOptional()
  @IsBoolean()
  featured: boolean;
}
