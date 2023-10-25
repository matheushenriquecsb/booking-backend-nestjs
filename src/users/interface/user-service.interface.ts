import { User } from '../../auth/models/user.model';
import { UpdateUserDto } from '../dto';

export interface UserServiceInterface {
  findAllUsers(): Promise<User[]>;

  findOneUser(id: string): Promise<User>;

  removeUser(id: string): Promise<void>;

  updateUser(id: string, user: UpdateUserDto): Promise<User>;
}
