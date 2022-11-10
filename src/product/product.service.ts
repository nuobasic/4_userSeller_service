import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Market } from '../market/entity/Market';
import { Repository } from 'typeorm';
import { Product } from './entity/Product';
import { CreateProductDto } from './dto/create-product.dto';
import { MarketService } from '../market/market.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly marketService: MarketService,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const market = await this.marketService.findOneMarket(
      createProductDto.marketId,
    );

    if (!market) {
      throw new NotFoundException('마켓이 없습니다.');
    }

    const product = await this.productRepository.create({
      market,
      productName: createProductDto.productName,
      price: createProductDto.price,
      deliverPrice: createProductDto.deliverPrice,
      content: createProductDto.content,
    });
    return this.productRepository.save(product);
  }
}
