import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { join } from 'path';
import { NODE_ENV } from 'src/shared/constants/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({ dev: NODE_ENV === 'development' }),
      /* null means that nest-next
      should look for pages in root dir */
      { viewsDir: null }
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public')
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
