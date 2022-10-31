import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { STATUS } from 'src/shared/constants/result';
import { IBaseService } from 'src/shared/interface/IBaseService.interface';
import { createSlug } from 'src/shared/utils/slug';
import { MongoRepository, UpdateWriteOpResult } from 'typeorm';
import { MongoFindOneOptions } from 'typeorm/find-options/mongodb/MongoFindOneOptions';
import { v4 as uuidv4 } from 'uuid';
import { Article } from './entities/article.entity';
import ArticleAddInput from './inputs/article-add.input';

@Injectable()
export class ArticleService implements IBaseService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: MongoRepository<Article>
  ) {}

  async getAll(): Promise<Article[]> {
    console.log('getAll');
    return this.articleRepository.find();
  }

  async deleteOneById(id: string): Promise<STATUS> {
    const a = await this.articleRepository.deleteOne({ _id: id });
    return a.result.ok ? STATUS.SUCCESS : STATUS.FAIL;
  }
  async getOneById(id: string): Promise<Article> {
    const query: MongoFindOneOptions<Article> = { where: { _id: id } };
    return await this.articleRepository.findOne(query);
  }

  async getOne({ ...params }): Promise<Article> {
    const query: MongoFindOneOptions<Article> = { where: { ...params } };
    const result = await this.articleRepository.findOne(query);
    console.log('type', typeof result);
    console.log('result', result);
    return result;
  }

  async updateOneById(id: string, input: ArticleAddInput): Promise<STATUS> {
    const a: UpdateWriteOpResult = await this.articleRepository.updateOne(
      { _id: id },
      { $set: { ...input, articleSlug: createSlug(input.articleTitle) } }
    );
    return a.result.ok ? STATUS.SUCCESS : STATUS.FAIL;
  }

  async create(input: ArticleAddInput): Promise<Article> {
    const article = new Article();
    article._id = uuidv4();
    article.article = input.article;
    article.cellOrder = input.cellOrder;
    article.articleTitle = input.articleTitle;
    article.articleSlug = createSlug(input.articleTitle);
    console.log('========>', article.articleSlug);

    return this.articleRepository.save(article);
  }
}