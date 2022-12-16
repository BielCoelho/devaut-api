import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';

import { AuthorizationGuard } from 'guards/authorization.guard';
import { CurrentUser } from 'guards/current-user';
import { CreateChildInput } from 'inputs/child.input';
import { Child } from 'models/child.model';

import { ChildService } from './child.service';

@Resolver(() => Child)
export class ChildResolver {
  constructor(private readonly childService: ChildService) {}

  @Mutation(() => Child)
  @UseGuards(AuthorizationGuard)
  async createChild(@CurrentUser() user: User, @Args('data') data: CreateChildInput) {
    return this.childService.create(data, user.id);
  }

  @Query(() => [Child])
  async getAllChildren() {
    return this.childService.findAll();
  }

  @Query(() => Child)
  async getChildById(@Args('id') id: string) {
    return this.childService.findById(id);
  }

  @Query(() => [Child])
  @UseGuards(AuthorizationGuard)
  async getMyChildren(@CurrentUser() user: User) {
    return this.childService.findByStaffMemberId(user.id);
  }
}
