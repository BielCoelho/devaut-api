import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as GQLModule } from '@nestjs/graphql';

import { GraphQLError, GraphQLErrorExtensions } from 'graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';

import { ChildResolver } from './modules/child/child.resolver';
import { ChildService } from './modules/child/child.service';
import { UserResolver } from './modules/user/user.resolver';
import { UserService } from './modules/user/user.service';

interface IGQLError extends GraphQLError {
  extensions: GraphQLErrorExtensions & {
    response?: {
      message?: string;
      statusCode?: number;
      error?: string;
    };
  };
}

@Module({
  imports: [
    GQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      debug: true,
      playground: true,
      formatError: (error: IGQLError) => {
        return {
          message: error.message || error.extensions?.response?.message,
          statusCode: error.extensions?.response?.statusCode,
          error: error.extensions?.response?.error,
        };
      },
    }),
  ],
  providers: [UserResolver, ChildResolver, PrismaService, UserService, ChildService],
})
export class GraphQLModule {}
