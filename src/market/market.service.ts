import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
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

  //seller의 권한을 가진 유저만 마켓의 등록을 할 수 있습니다.
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

  //등록한 마켓만 삭제를 할 수 있습니다.
  async deleteMarket(marketId: number, user: User) {
    const result = await this.marketRepository
      .createQueryBuilder('market')
      .leftJoin('market.user', 'user')
      .where('market.marketId =:marketId', { marketId })
      .andWhere('market.user =:userId', { userId: user.userId })
      .andWhere('market.deleteAt IS NULL')
      .getOne();

    if (!result) {
      throw new NotFoundException('마켓이 없습니다.');
    }
    return this.marketRepository.softDelete(marketId);
  }

  async findOneMarket(marketId: number) {
    const market = await this.marketRepository.findOne({ where: { marketId } });

    if (!market) {
      throw new NotFoundException('마켓이 없습니다.');
    }
    return market;
  }
}
