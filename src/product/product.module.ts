import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/Product';
import { Market } from '../market/entity/Market';
import { MarketModule } from '../market/market.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Market]), MarketModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
