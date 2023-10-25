import { User } from '../../auth/models/user.model';
import {
  LoginUserRequestDto,
  LoginUserResponseDto,
  RegisterUserRequestDto,
} from '../dto';

export interface AuthServiceInterface {
  registerUser(registerDto: RegisterUserRequestDto): Promise<Partial<User>>;

  loginUser(loginDto: LoginUserRequestDto): Promise<LoginUserResponseDto>;
}
