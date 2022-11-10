import { User } from 'src/user/entity/User';

export class CreateMarketDto {
  marketName: string;
  phone: string;
  country: string;
  user: User;
}
