import { Injectable } from "@nestjs/common";
import { OpenAI } from "openai";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class OpenaiService {
    private openaiService: OpenAI;
    private embeddingModel = "text-embedding-3-small";

    constructor(private configService: ConfigService){
        const apiKey = this.configService.get<string>('OPENAI_API_KEY');
       
        if(!apiKey){
            console.error('OPENAI_API_KEY is not set');
            return;
        }
        const client = new OpenAI({
            apiKey: apiKey,
        })

        this.openaiService = client;
    }


    async getEmbedding(text: string,model:string = this.embeddingModel) : Promise<OpenAIEmbeddingResponse>{
        const openAIEmbeddingResponse = await this.openaiService.embeddings.create({
            input: text,
            model: model,
        })

        return openAIEmbeddingResponse;
    }
}