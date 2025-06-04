export interface VectorItem {
    id: string;
   
    values: number[];
    metadata: {
        category: string;
        price: number;
    }
}
