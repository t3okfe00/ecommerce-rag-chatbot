// scripts/embed-products.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ProductEmbeddingService } from "../src/products/product-embedding.service"

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const embeddingService = app.get(ProductEmbeddingService);

  const products = [/* your 50 items */];
 

  try {
    console.log("Embedding products...");
    await embeddingService.embedProduct();
    console.log("✅ Products embedded successfully");
  } catch (error) {
    console.error("Error embedding products: ",error);
  }

  await app.close();
}

bootstrap();
