import { User } from '../models/user.model';

export class UserRepositorySpy {
  create(): Promise<Partial<User>> {
    return Promise.resolve({});
  }
}
