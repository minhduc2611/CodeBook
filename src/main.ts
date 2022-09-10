import { NestFactory } from '@nestjs/core';
import { AppModule } from './server/app.module';
import { PORT } from './shared/constants/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
