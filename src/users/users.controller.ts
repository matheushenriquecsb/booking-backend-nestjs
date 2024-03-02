import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
  Inject,
} from '@nestjs/common';

import { AuthGuard } from '../config/guards/permissions.guard';
import { User } from '../auth/models/user.model';
import { UpdateUserDto } from './dto';
import { UserServiceInterface } from './interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly usersService: UserServiceInterface,
  ) {}

  @ApiTags('Users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @ApiTags('Users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':userid')
  async findOneUser(@Param('userid') userId: string): Promise<User> {
    return this.usersService.findOneUser(userId);
  }

  @ApiTags('Users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete(':userid')
  async removeUser(@Param('userid') userId: string): Promise<void> {
    return this.usersService.removeUser(userId);
  }

  @ApiTags('Users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Patch(':userid')
  async updateUser(
    @Param('userid') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateUserDto);
  }
}
