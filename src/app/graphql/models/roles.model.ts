import { registerEnumType } from '@nestjs/graphql';

export enum RolesEnum {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  PARENT = 'PARENT',
}

registerEnumType(RolesEnum, {
  name: 'RolesEnum',
  description: 'Available Roles types enum',
});
