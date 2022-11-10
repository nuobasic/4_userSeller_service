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

  //상품 생성
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

  //상품 상세 조회
  async getProduct(productId: number) {
    let result;
    const product = await this.productRepository.findOne({
      where: { productId },
    });
    if (!product) {
      throw new NotFoundException('상품이 없습니다.');
    } else {
      result = await this.productRepository
        .createQueryBuilder('product')
        .leftJoin('product.market', 'market')
        .select([
          'product.productName',
          'product.price',
          'product.deliverPrice',
          'product.content',
          'market.marketName',
          'market.country',
        ])
        .getOne();
    }
    return result;
  }

  //상품 최신순 조회
  async recentProduct() {
    let result;
    const allProduct = await this.productRepository.find();
    if (allProduct) {
      result = await this.productRepository
        .createQueryBuilder('product')
        .leftJoin('product.market', 'market')
        .select([
          'product.productName',
          'product.price',
          'product.deliverPrice',
          'market.country',
        ])
        .orderBy({ 'product.createAt': 'DESC' })
        .getMany();
    }
    return result;
  }

  //상품 검색
  async searchProduct(search: string) {
    let result;

    if (search) {
      result = await this.productRepository
        .createQueryBuilder('product')
        .leftJoin('product.market', 'market')
        .where([
          `product.productName LIKE :search or market.country LIKE :search`,
          { search: `%${search}%` },
        ])
        .select([
          'product.productName',
          'product.price',
          'product.deliverPrice',
          'market.country',
        ])

        .getMany();
    }
    return result;
  }

  //상품 수정
  async updateProduct(productId: number, prduct: Product) {
    const exitedProduct = await this.productRepository.findOne({
      where: { productId },
    });
    let result;
    if (exitedProduct) {
      result = await this.productRepository
        .createQueryBuilder('product')
        .update(Product)
        .set({
          price: prduct.price,
          content: prduct.content,
          deliverPrice: prduct.deliverPrice,
        })
        .where('productId=:productId', { productId })
        .execute();
    }
    return result;
  }

  //상품 삭제
  async deleteProduct(productId: number) {
    await this.productRepository.delete(productId);
  }
}
