import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs/promises';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule); // No HTTP server needed
  const httpService = app.get(HttpService);

  try {
    const response = await firstValueFrom(
      httpService.get('https://api.escuelajs.co/api/v1/products'),
    );
    await fs.writeFile('products.json', JSON.stringify(response.data, null, 2));
    console.log(response);
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await app.close(); // Gracefully close Nest context
  }
}

bootstrap();
