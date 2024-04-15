import { User } from '../../auth/models/user.model';
import {
  LoginGithubRequestDto,
  LoginGoogleRequestDto,
  LoginUserRequestDto,
  LoginUserResponseDto,
  RegisterUserRequestDto,
} from '../dto';

export interface AuthServiceInterface {
  registerUser(registerDto: RegisterUserRequestDto): Promise<Partial<User>>;

  loginUser(loginDto: LoginUserRequestDto): Promise<LoginUserResponseDto>;

  loginGoogle(
    loginGoogleDto: LoginGoogleRequestDto,
  ): Promise<LoginUserResponseDto>;

  loginGithub(
    loginGithubDto: LoginGithubRequestDto,
  ): Promise<LoginUserResponseDto>;
}
