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

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Get(':productId')
  async getProduct(@Param(':productId') productId: number) {
    return await this.productService.getProduct(productId);
  }
  @Get()
  async recentProduct() {
    return await this.productService.recentProduct();
  }
  @Get()
  async searchProduct(@Query('search') search: string) {
    return await this.productService.searchProduct(search);
  }
  @Put(':productId')
  async updateProduct(
    @Param('productId') productId: number,
    @Body() product: Product,
  ): Promise<Product> {
    return await this.productService.updateProduct(productId, product);
  }

  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: number) {
    await this.productService.deleteProduct(productId);
    return {
      statusCode: 200,
      message: '삭제성공',
    };
  }
}
