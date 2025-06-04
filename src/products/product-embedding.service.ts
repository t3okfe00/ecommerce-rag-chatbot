import { Injectable } from "@nestjs/common";
import { VectorStore } from "../vector-store/vector-store.interface";
import { OpenaiService } from "../openai/openai.service";




@Injectable()
export class ProductEmbeddingService {
    constructor(
        private readonly vectorStore: VectorStore,
        private readonly openaiService: OpenaiService
    ){}

    async embedProduct(){
        const text = "This is a test product";
        

        
        // TODO: get embedding from openai for the product 
        const embedding = await this.openaiService.getEmbedding(text);
        console.log("Embedding in product-embedding.service.ts: ",embedding);
        const embeddingData = {
            id:"25",
           
            values:embedding.data[0].embedding,
            metadata:{
                category:"test",
                price:100
            }
        }
        await this.vectorStore.upsertEmbedding(embeddingData);

    }
}