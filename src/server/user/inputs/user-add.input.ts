import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class UserAddInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
