import { Injectable } from "@nestjs/common";
import { VectorStore } from "../vector-store/vector-store.interface";
import { OpenaiService } from "../openai/openai.service";

interface ProductEmbeddingData {
    id: number;
    text: string;
    metadata: {
        category: string;
        price: number;
    };
}

@Injectable()
export class ProductEmbeddingService {
    constructor(
        private readonly vectorStore: VectorStore,
        private readonly openaiService: OpenaiService
    ){}

    async embedProducts(products: ProductEmbeddingData[]) {
        // Extract all texts from products
        const texts = products.map(product => product.text);
        
        // Get embeddings for all texts at once
        const embeddingResponse = await this.openaiService.getEmbedding(texts);
        
        // Create the final structure with embeddings
        const embeddingsWithMetadata = products.map((product, index) => ({
            id: product.id.toString(),
            values: embeddingResponse.data[index].embedding,
            metadata: {
                category: product.metadata.category,
                price: product.metadata.price
            }
        }));

        // Upsert all embeddings
        for (const embedding of embeddingsWithMetadata) {
            await this.vectorStore.upsertEmbedding(embedding);
        }

        return embeddingsWithMetadata;
    }

    async fetchProducts(){
       const fetchedProducts = await this.vectorStore.fetchProducts();
       console.log("Fetched products: ",fetchedProducts);
    }
}