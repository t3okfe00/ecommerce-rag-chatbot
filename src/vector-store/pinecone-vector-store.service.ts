import { Injectable } from "@nestjs/common";
import { VectorStore } from "./vector-store.interface";
import { Pinecone } from "@pinecone-database/pinecone";
import { VectorItem } from "./interfaces/vector-item.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PineconeVectorStoreService implements VectorStore {
    private pinecone: Pinecone;
    private index;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('PINECONE_API_KEY');
        
        if (!apiKey) {
            throw new Error('PINECONE_API_KEY is not set in environment variables');
        }

        this.pinecone = new Pinecone({
            apiKey: apiKey,
        });
        this.index = this.pinecone.Index("products");
    }

    
    async upsertEmbedding(item:VectorItem): Promise<void> {
       try {
        await this.index.upsert([item])
        console.log("✅ Embedding upserted successfully");
       } catch (error) {
        console.error("Error upserting embedding: ",error);
       }
        
    }
    

    async searchEmbeddings(query: string): Promise<VectorItem[]> {
        return [];
    }
}