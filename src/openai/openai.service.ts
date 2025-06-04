import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException } from "@nestjs/common";
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


    async getEmbedding(text: string,model:string = this.embeddingModel){
        try {
            const openAIEmbeddingResponse = await this.openaiService.embeddings.create({
                input: text,
                model: model,
            })
    
            console.log("Returning embedding response: from openai.service.ts");
            return openAIEmbeddingResponse;
            
        }
        catch (error) {
            
            if(error.code === "invalid_api_key"){
               throw new UnauthorizedException("Invalid API key");
            }else if(error.status >= 400 && error.status < 500){
                throw new BadRequestException("Bad request to OpanAI");
            }else{
                throw new InternalServerErrorException("An error occurred while generating the embedding");
            }
        }
       
    }
     
}