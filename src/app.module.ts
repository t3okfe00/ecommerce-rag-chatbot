import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { ProductsController } from './products/products.controller';
import { OpenaiService } from './openai/openai.service';
import {ConfigModule} from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    HttpModule],
  controllers: [ProductsController],
  providers: [OpenaiService],
  exports: [OpenaiService]
})
export class AppModule {}
