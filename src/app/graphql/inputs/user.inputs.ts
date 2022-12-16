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
  confirmPassword: string;

  @Field()
  birthday: Date;

  @Field(() => GenderEnum)
  gender: GenderEnum;

  @Field()
  phone: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  id: string;

  @Field()
  name?: string;

  @Field()
  birthday?: Date;

  @Field(() => GenderEnum)
  gender?: GenderEnum;

  @Field()
  phone?: string;
}

@InputType()
export class AuthUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
