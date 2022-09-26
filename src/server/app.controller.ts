import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Render, UseInterceptors
} from '@nestjs/common';
import { AppService } from './app.service';
import { ParamsInterceptor } from './params.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/posts')
  @Render('posts')
  @UseInterceptors(ParamsInterceptor)
  posts() {
    return {};
  }
  @Get('/codebooks')
  @Render('codebooks')
  @UseInterceptors(ParamsInterceptor)
  codebooks() {
    return {}
  }

  @Get('/api/blog-posts')
  public listBlogPosts() {
    return this.appService.getBlogPosts();
  }

  @Get('/api/blog-posts/:id')
  public getBlogPostById(@Param('id', new ParseIntPipe()) id: number) {
    return this.appService.getBlogPost(id);
  }
}
