import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './config/logger.config';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        
      forbidNonWhitelisted: true, 
      transform: true,        
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
