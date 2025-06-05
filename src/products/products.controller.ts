import { Controller, Get, Query } from '@nestjs/common';
import { products } from "../../products";
import { Product } from "./interfaces/product.interface";
import { OpenaiService } from '../openai/openai.service';
import { VectorStore } from '../vector-store/vector-store.interface';

@Controller('products')
export class ProductsController {
   constructor(
    private openaiService: OpenaiService,
    private vectorStore: VectorStore
   ){}

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
        console.log("Embedding: ",embedding);
        return embedding;
    }
    

    @Get("/recommend")
    async recommendProducts(@Query('query') query: string){
        console.log("Recommendation runs with query: ",query);
        const isProductRelated = await this.openaiService.isProductRelatedQuery(query);
        if(isProductRelated === "true"){
        console.log("Is product related: ",isProductRelated);
        const embedding = await this.openaiService.getEmbedding(query);
        const results = await this.vectorStore.queryVector(embedding);
        const findProductsFromStore = products.filter(product=>{
            return results.find(result=>product.id.toString() === result.id.toString());
        }).map(product=>product.title);
        const description = await this.openaiService.describeProductsInChat(query,findProductsFromStore);
        console.log("Description: ",description);
        return {
            type: "Product Recommendations",
            products: findProductsFromStore,
            description: description
        };
        }else{
           const response = await this.openaiService.chatAsNormalBot(query);
           console.log("Not product");
           return {
            type:"Normal ChatBot",
            response: response
           };
        }
    }
}