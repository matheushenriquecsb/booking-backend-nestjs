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

  @Prop([
    {
      number: { type: Number },
      unavailableDates: { type: [Date] },
    },
  ])
  roomNumbers: Record<string, any>[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
