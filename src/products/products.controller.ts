import { Controller, Get, Query } from '@nestjs/common';
import { products } from "../../products";
import { Product } from "./interfaces/product.interface";

@Controller('products')
export class ProductsController {

    @Get()
    getProducts(@Query('page') page = "1", @Query('limit') limit = "10"): Product[] {
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        console.log(pageNumber, limitNumber);
        console.log(typeof pageNumber, typeof limitNumber);
        return products;
    }

}