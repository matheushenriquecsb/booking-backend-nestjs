import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  img: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isAdmin: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
