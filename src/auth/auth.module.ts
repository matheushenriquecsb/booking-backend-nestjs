import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth, AuthSchema } from './models/auth.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '80000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
