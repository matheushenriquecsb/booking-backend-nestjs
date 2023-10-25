import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../auth/models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserServiceInterface',
      useClass: UsersService,
    },
  ],
  exports: [
    {
      provide: 'UserServiceInterface',
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
