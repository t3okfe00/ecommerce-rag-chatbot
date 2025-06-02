interface EmbeddingData {
    object: string;
    index: number;
    embedding: number[];
}


interface OpenAIEmbeddingResponse {
    object: string;
    data: EmbeddingData[];
    model: string;
    usage: {
        prompt_tokens: number;
        total_tokens: number;
    }
}