import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { verify } from 'jsonwebtoken';

import { PrismaService } from 'database/prisma';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = GqlExecutionContext.create(context).getContext();
    const token = req.headers.authorization;

    try {
      const { sub: user_id } = verify(token, process.env.TOKEN_SECRET);

      const user = await this.prisma.user.findUnique({
        where: { id: user_id as string },
      });

      if (!user) throw new NotFoundException('User not found');
      req.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
