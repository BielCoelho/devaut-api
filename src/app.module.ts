import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GraphQLModule } from 'application';
import { DatabaseModule } from 'database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), GraphQLModule, DatabaseModule],
  providers: [],
})
export class AppModule {}
