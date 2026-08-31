import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // one line, and every DTO's class-validator decorators are enforced before
  // a controller method runs. whitelist strips properties no DTO declares,
  // so a client cannot smuggle in an id or a created_at.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3006);
}
bootstrap();
