import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  maxPeople: number;

  @Prop({ required: true })
  desc: string;

  @Prop()
  roomNumber: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
