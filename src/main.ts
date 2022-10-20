import { NestFactory } from '@nestjs/core';
import { RenderModule } from 'nest-next';
// import Next from 'next';
import { AppModule } from './server/app.module';
import { NODE_ENV, PORT } from './shared/constants/env';

async function bootstrap() {
  const dev = NODE_ENV !== 'production';
  // const client = Next({ dev });
  // await client.prepare();
  const server = await NestFactory.create(AppModule);
  const renderer = server.get(RenderModule);
  /* viewsDir null means that nest-next should look for pages in root dir */
  // renderer.register(server, client, { viewsDir: null, passthrough404: true });

  await server.listen(PORT);
}
bootstrap();
