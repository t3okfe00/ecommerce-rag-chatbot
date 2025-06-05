import { VectorItem } from "./interfaces/vector-item.interface";

export abstract class VectorStore {
    abstract upsertEmbedding(item: VectorItem): Promise<void>;
    abstract queryVector(embedding: any): Promise<VectorItem[]>;
    abstract fetchProducts(): Promise<VectorItem[]>;
}