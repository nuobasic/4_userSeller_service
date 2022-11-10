import { UserRole } from '../entity/UserRole';

export class CreateUserDto {
  email: string;
  password: string;
  role: UserRole;
}
