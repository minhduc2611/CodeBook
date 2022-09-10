import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Render,
  UseInterceptors
} from '@nestjs/common';
import { AppService } from './app.service';
import { ParamsInterceptor } from './params.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('/posts')
  // @Render('posts')
  // @UseInterceptors(ParamsInterceptor)
  // posts() {
  //   return {};
  // }
  @Get('/blog-editor')
  @Render('blog-editor')
  @UseInterceptors(ParamsInterceptor)
  blogEditor() {
    return {};
  }

  // @Get(':id')
  // @Render('[id]')
  // @UseInterceptors(ParamsInterceptor)
  // public blogPost() {
  //   return {};
  // }
  @Get('/api/blog-posts')
  public listBlogPosts() {
    return this.appService.getBlogPosts();
  }

  @Get('/api/blog-posts/:id')
  public getBlogPostById(@Param('id', new ParseIntPipe()) id: number) {
    return this.appService.getBlogPost(id);
  }
}
