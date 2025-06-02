import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController],
  providers: [],
})
export class AppModule {}
