/* eslint-disable @typescript-eslint/no-unused-vars */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';

import { User } from '../auth/models/user.model';
import { UpdateUserDto } from './dto';
import { UserServiceInterface } from './interface';

@Injectable()
export class UsersService implements UserServiceInterface {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneUser(id: string): Promise<User> {
    const userFromCache = await this.getUserFromCache(id);

    if (userFromCache) {
      return userFromCache;
    }

    const user = await this.userModel.findById({ _id: id }).exec();
    console.log(user);

    if (!user) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    await this.setUserToCache(`${id}`, user);

    return user;
  }

  async removeUser(id: string): Promise<void> {
    const user = await this.userModel.findById({ _id: id });
    if (!user) {
      throw new NotFoundException();
    }

    await this.userModel.deleteOne({ _id: user.id });
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const userUpdated = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: user },
      { new: true },
    );

    if (!userUpdated) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: 'Hotel not found',
      });
    }

    return userUpdated;
  }

  private async getUserFromCache(cacheKey: string): Promise<User> {
    try {
      return await this.cacheManager.get(`${cacheKey}`);
    } catch (error) {
      throw new Error(error);
    }
  }

  private async setUserToCache(
    cacheKey: string,
    cacheValue: any,
  ): Promise<void> {
    try {
      await this.cacheManager.set(`${cacheKey}`, cacheValue);
    } catch (error) {
      throw new Error(error);
    }
  }
}
