import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { CellObject } from './cell.entity';

@Entity()
@ObjectType()
export class Article {
  constructor() {
    this._id = '';
    this.article = [];
    this.articleSlug = '';
    this.articleTitle = '';
    this.cellOrder = [];
  }

  @Field()
  @ObjectIdColumn()
  _id: string;

  @Field(() => String!)
  @Column()
  articleTitle: string;

  @Field(() => String!)
  @Column({ unique: true, nullable: true })
  articleSlug: string;

  @Field(() => [String!], { nullable: true })
  @Column()
  cellOrder: string[];

  @Field(() => String!, { nullable: true })
  @Column()
  category: string;

  @Field(() => String!, { nullable: true })
  @Column()
  progress: string;

  @Field(() => [CellObject], { nullable: 'items' })
  @Column()
  article: CellObject[];
}
