import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../guards/authorization.guard';
import { CurrentUser } from '../../guards/current-user';
import { CreateChildInput } from '../../inputs/child.input';
import { Child } from '../../models/child.model';
import { User } from '../../models/user.model';
import { ChildService } from './child.service';

@Resolver(() => Child)
export class ChildResolver {
  constructor(private readonly childService: ChildService) {}

  @Mutation(() => Child)
  @UseGuards(AuthorizationGuard)
  async createChild(@CurrentUser() user: User, @Args('data') data: CreateChildInput) {
    return this.childService.create(data);
  }

  @Query(() => String)
  async testeChild() {
    return 'Hello World';
  }
}
