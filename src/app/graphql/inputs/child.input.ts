import { Field, InputType } from '@nestjs/graphql';

import { GenderEnum } from '../models/gender.model';

@InputType()
export class CreateChildInput {
  @Field()
  name: string;

  @Field(() => GenderEnum)
  gender: GenderEnum;

  @Field()
  active: boolean;

  @Field()
  birthday: Date;
}
