import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { OpenAI } from "openai";
import { ConfigService } from "@nestjs/config";
import { Product } from "../products/interfaces/product.interface"

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


    async getEmbedding(text: string | string[], model: string = this.embeddingModel) {
        try {
            const openAIEmbeddingResponse = await this.openaiService.embeddings.create({
                input: text,
                model: model,
            })
    
           
            console.log("Tokens used for getEmbedding: ",openAIEmbeddingResponse.usage.total_tokens);
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

    async isProductRelatedQuery(query: string){
        const prompt = `
        Message: ${query}
        You are a smart seller assistant.Your job is to detect if the user is *talking about an activity that might involve using physical products, items, or equipment*, even if they don’t explicitly say they want to buy something.
        If the  messsage is related to product/equipment/item recommendations, return "true".
        If the  messsage is not related to products, return "false".
        you will strictly return "true" or "false" without any other text or explanation.
        
        `
        const response = await this.openaiService.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{role: "user", content: prompt}],
        })
        console.log("Tokens used to check if isProductRelatedQuery: ",response.usage?.total_tokens);
        return response.choices[0].message.content;
    }

    async chatAsNormalBot(query: string){
        const prompt = `
        You are a helpful assistant that can answer questions and help with tasks.
        Answer the following message: ${query} in a friendly way but mention politely that users are supposed to ask product related questions.
        `
        const response = await this.openaiService.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{role: "user", content: prompt}],
        })
        console.log("Tokens used chatAsNormalBot: ",response.usage?.total_tokens);
        return response.choices[0].message.content;
    }

    async describeProductsInChat(query: string, products: string[]){
        const prompt = `
        This is user message : ${query}
        You are a helpful seller assistant that can describe products in a friendly way.
        We have founded that the customer may buy following items. ${products}
        Give brief reasoing (ONLY ABOUT ITEMS YOU ARE PROVIDED) for why the customer may buy these items (1 max 2 sentences for each item).
        `
        const response = await this.openaiService.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{role: "user", content: prompt}],
        })
        console.log("Tokens used describeProductsInChat: ",response.usage?.total_tokens);
        return response.choices[0].message.content;
    }
     

}