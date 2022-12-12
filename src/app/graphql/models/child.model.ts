import { Field, ID, ObjectType } from '@nestjs/graphql';

import { GenderEnum } from './gender.model';

@ObjectType('Child')
export class Child {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  active: boolean;

  @Field()
  birthday: Date;

  @Field(() => GenderEnum)
  gender: GenderEnum;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
