import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // whitelisted additional fields or properties
      forbidNonWhitelisted: true, // forbid additional fields or properties send errors
      transform: true, // transforms the incoming request to an instance of the DTO class after validation
    }),
  );
  await app.listen(3000);
}
bootstrap();
