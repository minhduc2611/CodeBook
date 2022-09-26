import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    providers: [ArticleResolver, ArticleService]
})
export class ArticleModule {

}
