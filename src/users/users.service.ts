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

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll() {
    const users = await this.userModel.find();

    return users.map((users) => ({
      _id: users.id,
      username: users.username,
      email: users.email,
      country: users.country,
      city: users.country,
      phone: users.phone,
      img: users.img,
      isAdmin: users.isAdmin,
    }));
  }

  async findOne(id: string) {
    const userFromCache = await this.getUserFromCache(id);

    if (userFromCache) {
      return userFromCache;
    }

    console.log('caindo aqui');

    const user = await this.userModel.findOne({ _id: id }).exec();
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

  async remove(id: string) {
    const user = await this.userModel.findById({ _id: id });
    if (!user) {
      throw new NotFoundException();
    }

    return this.userModel.deleteOne({ _id: user.id });
  }

  private async getUserFromCache(cacheKey: string): Promise<Partial<User>> {
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
      console.log('setando no cache');
    } catch (error) {
      throw new Error(error);
    }
  }
}
