import { Controller, Get, Query } from '@nestjs/common';
import { products } from "../../products";
import { Product } from "./interfaces/product.interface";
import { OpenaiService } from '../openai/openai.service';

@Controller('products')
export class ProductsController {
   constructor(private openaiService: OpenaiService){}

    @Get()
    getProducts(@Query('page') page = "1", @Query('limit') limit = "10"): Product[] {
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        console.log(pageNumber, limitNumber);
        console.log(typeof pageNumber, typeof limitNumber);
        return products;
    }

    @Get('embed')
    async getEmbedding(@Query('text') text: string){
        console.log("Embedding runs with text: ",text);
        const embedding = await this.openaiService.getEmbedding(text);
        
        return embedding;
    }


}