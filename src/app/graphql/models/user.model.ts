import { Field, ID, ObjectType } from '@nestjs/graphql';

import { GenderEnum } from './gender.model';

@ObjectType('User')
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  birthday: Date;

  @Field(() => GenderEnum)
  gender: GenderEnum;

  @Field()
  phone?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType('CreateUser')
export class UserWithToken {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
