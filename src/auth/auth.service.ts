import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { LoginAuthRequestDto, RegisterAuthRequestDto } from './dto';
import { Auth } from './models/auth.model';
import LoginAuthResponseDto from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterAuthRequestDto) {
    const checkUser = await this.authModel.findOne({
      username: registerDto.username,
    });

    if (checkUser) {
      throw new BadRequestException(
        `User ${registerDto.username} already registered`,
      );
    }

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

      const { username, email, id } = user;

      return { username, email, id };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(loginDto: LoginAuthRequestDto): Promise<LoginAuthResponseDto> {
    const user = await this.authModel.findOne({
      username: loginDto.username,
    });

    if (!user) {
      throw new NotFoundException(`User ${loginDto.username} not found in db`);
    }

    const checkPassword = bcrypt.compare(loginDto.password, user.password);

    if (!checkPassword) {
      throw new BadRequestException('Wrong Credentials');
    }

    const payload = { id: user.id, isAdmin: user.isAdmin };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
