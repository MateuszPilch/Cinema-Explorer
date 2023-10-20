import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:4200'],
      methods: ["GET", "POST"],
  });
  await app.listen(process.env.BACKEND_PORT);
}
bootstrap();
