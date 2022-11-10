import { UserRole } from '../entity/UserRole';

export class LogInUserDto {
  email: string;
  password: string;
  role: UserRole;
}
