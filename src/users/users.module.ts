import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/auth/models/auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
