import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from 'src/auth/models/auth.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

  async findAll() {
    const users = await this.authModel.find();

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
    const user = await this.authModel.find({ _id: id });

    if (!user) {
      throw new NotFoundException();
    }

    return user.map((users) => ({
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

  async remove(id: string) {
    const user = await this.authModel.findById({ _id: id });
    if (!user) {
      throw new NotFoundException();
    }

    return this.authModel.deleteOne({ _id: user.id });
  }
}
