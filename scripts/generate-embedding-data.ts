import {products} from "../products";
import * as fs from 'fs/promises';



const embeddingData = products.map((product)=>{
    return {
        id: product.id,
        text: "title: " + product.title + ". description: " + product.description +". category: " + product.category.name + ". price: " + product.price,
        metadata: {
            category: product.category.name,
            price: product.price,
          
        }
    }
})

fs.writeFile("embeddingData.json", JSON.stringify(embeddingData, null, 2));
console.log("embeddingData", embeddingData);
