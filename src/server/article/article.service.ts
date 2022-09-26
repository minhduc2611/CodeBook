import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { STATUS } from 'src/shared/constants/result';
import { IBaseService } from 'src/shared/interface/IBaseService.interface';
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
    let a = await this.articleRepository.deleteOne({ _id: id });
    return a.result.ok ? STATUS.SUCCESS : STATUS.FAIL;
  }
  async getOneById(id: string): Promise<Article> {
    let query: MongoFindOneOptions<Article> = { where: { _id: id } };
    return await this.articleRepository.findOne(query);
  }

  async getOne({ ...params }): Promise<Article> {
    let query: MongoFindOneOptions<Article> = { where: { ...params } };
    return await this.articleRepository.findOne(query);
  }

  async updateOneById(id: string, input: ArticleAddInput): Promise<STATUS> {
    let a: UpdateWriteOpResult = await this.articleRepository.updateOne(
      { _id: id },
      { $set: { ...input, articleSlug: this.createSlug(input.articleTitle) } }
    );
    return a.result.ok ? STATUS.SUCCESS : STATUS.FAIL;
  }

  async create(input: ArticleAddInput): Promise<Article> {
    const article = new Article();
    article._id = uuidv4();
    article.article = input.article;
    article.cellOrder = input.cellOrder;
    article.articleTitle = input.articleTitle;
    article.articleSlug = this.createSlug(input.articleTitle);
    console.log('========>', article.articleSlug);

    return this.articleRepository.save(article);
  }

  createSlug(param: string) {
    return slugify(param, {
      replacement: '-',
      remove: /[^\w\s\d]+/g,
      lower: false,
      strict: false,
      locale: 'vi',
      trim: true
    });
  }
}

// gửi mai ctc : Vytt4 cc anh TuanNDH
// xong mock, nhờ chị Vy + anh review giúp
