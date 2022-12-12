import { Field, InputType } from '@nestjs/graphql';

import { GenderEnum } from '../models/gender.model';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  birthday: Date;

  @Field(() => GenderEnum)
  gender: GenderEnum;

  @Field()
  phone: string;

  @Field()
  confirmPassword: string;
}

@InputType()
export class AuthUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
