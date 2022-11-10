import { UserRole } from '../entity/UserRole';

export type JwtPayload = {
  email: string;
  role: UserRole;
};
