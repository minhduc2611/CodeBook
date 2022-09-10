import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

console.log('aaaaaaa==?', resolve(__dirname, '..'));
console.log('aaaaaaa==2', join(__dirname, '..', 'server'));
@Module({
  imports: [
    // RenderModule.forRootAsync(
    //   Next({ dev: NODE_ENV === 'development', dir: resolve(__dirname, '..')}),
    //   /* null means that nest-next
    //   should look for pages in root dir */
    //   { passthrough404: true, viewsDir: null }
    // ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
