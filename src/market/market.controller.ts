import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../user/decorator/user.decorator';
import { User } from '../user/entity/User';
import { AuthGuard } from '@nestjs/passport';
import { CreateMarketDto } from './dto/create-market.dto';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  /**
   * @url POST 'api/market'
   * @Body 마켓 body {marketName, phone, country}
   * @GetUser 로그인 유저
   * @description 마켓 생성기능
   * @returns 마켓 생성
   */

  @UseGuards(AuthGuard())
  @Post()
  async createMarket(
    @Body() createMarketDto: CreateMarketDto,
    @GetUser() user: User,
  ) {
    return await this.marketService.createMarket(createMarketDto, user);
  }

  /**
   * @url Delete 'api/market/:marketId'
   * @Param marketId
   * @GetUser 로그인 유저
   * @description 마켓 삭제 기능
   * @returns 마켓 삭세
   */
  @UseGuards(AuthGuard())
  @Delete(':marketId')
  async deleteMarket(
    @Param(':marketId') marketId: number,
    @GetUser() user: User,
  ) {
    return await this.marketService.deleteMarket(marketId, user);
  }
}
