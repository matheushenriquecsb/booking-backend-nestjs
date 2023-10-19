import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Hotel>;

@Schema()
export class Hotel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  distance: string;

  @Prop()
  photos: string[];

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  desc: string;

  @Prop()
  rating: number;

  @Prop()
  rooms: string[];

  @Prop({ required: true })
  cheapestPrice: number;

  @Prop({ default: false })
  featured: boolean;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
