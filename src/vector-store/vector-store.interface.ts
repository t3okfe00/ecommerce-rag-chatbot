import { VectorItem } from "./interfaces/vector-item.interface";

export abstract class VectorStore {
    abstract upsertEmbedding(item: VectorItem): Promise<void>;
    abstract searchEmbeddings(query: string): Promise<VectorItem[]>;
}