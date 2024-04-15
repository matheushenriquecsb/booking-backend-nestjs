import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import {
  LoginUserRequestDto,
  LoginUserResponseDto,
  RegisterUserRequestDto,
} from './dto';
import { AuthServiceInterface } from './interface';
import { User } from './models/user.model';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @InjectModel(User.name) private authModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async registerUser(
    registerDto: RegisterUserRequestDto,
  ): Promise<Partial<User>> {
    const checkEmail = await this.authModel.findOne({
      email: registerDto.email,
    });

    if (checkEmail) {
      throw new BadRequestException(
        `Email ${registerDto.email} already registered`,
      );
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    try {
      const user = await this.authModel.create({
        ...registerDto,
        password: hashedPassword,
      });

      const { fullName, email } = user;

      return { fullName, email };
    } catch (error) {
      throw new Error(error);
    }
  }

  async loginUser(
    loginDto: LoginUserRequestDto,
  ): Promise<LoginUserResponseDto> {
    const user = await this.authModel.findOne({
      email: loginDto.email,
    });

    if (!user)
      throw new NotFoundException(
        `User with email ${loginDto.email}, not found in database`,
      );

    const checkPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!checkPassword) throw new BadRequestException('Wrong Credentials');

    const payload = { id: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
