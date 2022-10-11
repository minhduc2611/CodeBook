import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class Cell {
  @Field(() => String)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  type: 'code' | 'text';
}

@ObjectType()
export class CellObject extends Cell {}

@InputType()
export class CellInput extends Cell {}
