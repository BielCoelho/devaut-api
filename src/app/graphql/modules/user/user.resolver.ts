import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../guards/authorization.guard';
import { CurrentUser } from '../../guards/current-user';
import { AuthUserInput, CreateUserInput } from '../../inputs/user.inputs';
import { User, UserWithToken } from '../../models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async testeUser() {
    return 'Hello World';
  }

  @Mutation(() => UserWithToken)
  async authUser(@Args('data') data: AuthUserInput) {
    return await this.userService.auth(data);
  }

  @Mutation(() => UserWithToken)
  async createUser(@Args('data') data: CreateUserInput) {
    return await this.userService.create(data);
  }

  @Query(() => UserWithToken)
  @UseGuards(AuthorizationGuard)
  async getUserByID(@Args('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Query(() => UserWithToken)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: UserWithToken) {
    return user;
  }

  @Mutation(() => UserWithToken)
  @UseGuards(AuthorizationGuard)
  async updateUser(@Args('data') data: CreateUserInput, @CurrentUser() { user }: UserWithToken) {
    return await this.userService.update(user.id, data);
  }
}
