import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
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
}
