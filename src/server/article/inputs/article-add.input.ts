import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';
import { CellInput } from '../entities/cell.entity';

// @InputType()
// class CellInput extends Cell {
//   @Field(() => String)
//   id: string;
// }

@InputType()
export default class ArticleAddInput {
  @Field(() => String)
  articleTitle: string;

  @Field(() => [String])
  cellOrder: string[];

  @Field(() => String)
  @Column()
  category: string;

  @Field(() => String)
  @Column()
  progress: string;

  @Field(() => [CellInput])
  article: CellInput[];
}
