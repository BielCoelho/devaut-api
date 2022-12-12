import { registerEnumType } from '@nestjs/graphql';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NOT_INFORMED = 'NOT_INFORMED',
}

registerEnumType(GenderEnum, {
  name: 'GenderEnum',
  description: 'Available Genders types enum',
});
