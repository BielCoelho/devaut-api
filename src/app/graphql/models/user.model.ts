import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

import { GenderEnum } from './gender.model';

// import { GenderEnum } from './gender.model';

export enum RolesEnum {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  PARENT = 'PARENT',
}

registerEnumType(RolesEnum, {
  name: 'RolesEnum',
  description: 'Available Roles types enum',
});

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
