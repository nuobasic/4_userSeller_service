import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/Product';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * @url POST 'api/product/'
   * @Body 상품 body {productName, price, deliverPrice, content}
   * @description 상품 생성기능
   * @returns 상품 생성
   */
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  /**
   * @url Get 'api/product/:productId'
   * @Param productId
   * @description 상품 개별 조회 기능
   * @returns 상품 개별 조호;
   */
  @Get(':productId')
  async getProduct(@Param(':productId') productId: number) {
    return await this.productService.getProduct(productId);
  }
  /**
   * @url Get 'api/market/
   * @description 상품 최신순 조회 기능
   * @returns 상품 최신순 조회
   */
  @Get()
  async recentProduct() {
    return await this.productService.recentProduct();
  }
  /**
   * @url Get 'api/market?search=''
   * @description 상품 검색(상품 이름, 나라별)
   * @returns 검색 내용
   */
  @Get()
  async searchProduct(@Query('search') search: string) {
    return await this.productService.searchProduct(search);
  }

  /**
   * @url Put 'api/market/:productId
   * @Param productId
   * @Body 상품 엔티디
   * @description 상품 수정 기능
   * @returns 상품 수정
   */
  @Put(':productId')
  async updateProduct(
    @Param('productId') productId: number,
    @Body() product: Product,
  ): Promise<Product> {
    return await this.productService.updateProduct(productId, product);
  }

  /**
   * @url Delete 'api/market/:productId
   * @Param productId
   * @description 상품 삭제 기능
   * @returns 상품 삭제
   */
  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: number) {
    await this.productService.deleteProduct(productId);
    return {
      statusCode: 200,
      message: '삭제성공',
    };
  }
}
