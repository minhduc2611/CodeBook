import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import ArticleAddInput from './inputs/article-add.input';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => [Article], { nullable: 'itemsAndList' })
  async articles() {
    return await this.articleService.getAll();
  }

  @Query(() => Article)
  async article(
    @Args({
      name: '_id',
      type: () => String,
      nullable: true
    })
    _id: string,
    @Args({
      name: 'articleSlug',
      type: () => String,
      nullable: true
    })
    articleSlug: string
  ) {
    let article: Article;
    if (_id) {
      article = await this.articleService.getOneById(_id);
    } else if (articleSlug) {
      article = await this.articleService.getOne({ articleSlug });
    }
    console.log('article', article);
    return article;
  }

  @Mutation(() => Number)
  async updateArticle(
    @Args('_id') _id: string,
    @Args('input') input: ArticleAddInput
  ) {
    const article = await this.articleService.updateOneById(_id, input);
    return article;
  }

  @Mutation(() => Number)
  async deleteArticle(@Args('_id') _id: string) {
    const article = await this.articleService.deleteOneById(_id);
    return article;
  }

  @Mutation(() => Article)
  async createArticle(@Args('input') input: ArticleAddInput) {
    return await this.articleService.create(input);
  }
}
