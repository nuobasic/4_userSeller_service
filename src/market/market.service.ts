import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/User';
import { UserRole } from '../user/entity/UserRole';
import { Repository } from 'typeorm';
import { CreateMarketDto } from './dto/create-market.dto';
import { Market } from './entity/Market';
@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(Market)
    private readonly marketRepository: Repository<Market>,
  ) {}

  async createMarket(createMarketDto: CreateMarketDto, user: User) {
    const market = new Market();

    if (user.role === UserRole.USER) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    market.marketName = createMarketDto.marketName;
    market.phone = createMarketDto.phone;
    market.country = createMarketDto.country;
    market.user = user;

    const saveMarket = await this.marketRepository.save(market);

    return saveMarket;
  }
}
