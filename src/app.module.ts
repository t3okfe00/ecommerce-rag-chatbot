import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsController } from './products/products.controller';
import { OpenaiService } from './openai/openai.service';
import { ConfigModule } from '@nestjs/config'
import { VectorStore } from './vector-store/vector-store.interface';
import { PineconeVectorStoreService } from './vector-store/pinecone-vector-store.service';
import { ProductEmbeddingService } from './products/product-embedding.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    HttpModule
  ],
  controllers: [ProductsController],
  providers: [
    OpenaiService,
    ProductEmbeddingService,
    {
      provide: VectorStore,
      useClass: PineconeVectorStoreService
    }
  ],
  exports: [OpenaiService]
})
export class AppModule {}
