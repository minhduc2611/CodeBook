import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;
}
