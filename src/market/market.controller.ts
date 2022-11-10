import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../user/decorator/user.decorator';
import { User } from '../user/entity/User';
import { AuthGuard } from '@nestjs/passport';
import { CreateMarketDto } from './dto/create-market.dto';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @UseGuards(AuthGuard())
  @Post()
  async createMarket(
    @Body() createMarketDto: CreateMarketDto,
    @GetUser() user: User,
  ) {
    return await this.marketService.createMarket(createMarketDto, user);
  }
}
