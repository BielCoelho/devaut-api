import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

import { CreateChildInput } from '../../inputs/child.input';

@Injectable()
export class ChildService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateChildInput) {
    return await this.prisma.child.create({ data });
  }
}
