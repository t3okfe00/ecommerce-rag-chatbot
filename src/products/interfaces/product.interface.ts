export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string; // ISO date string
    updatedAt: string;  // ISO date string
  }
  
  export interface Product {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: Category;
    images: string[];    // array of image URLs
    creationAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
  }
  