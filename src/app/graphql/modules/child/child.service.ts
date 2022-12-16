import { Injectable } from '@nestjs/common';
import { RoleOptions } from '@prisma/client';

import { PrismaService } from 'database/prisma';
import { CreateChildInput } from 'inputs/child.input';

@Injectable()
export class ChildService {
  constructor(private readonly prisma: PrismaService) {}

  private async verifyStaffMemberId(staffMemberId: string) {
    const staffRole = await this.prisma.role.findFirst({ where: { name: RoleOptions.STAFF } });

    const staffMember = this.prisma.user.findFirst({
      where: { id: staffMemberId, role: { id: staffRole.id } },
    });

    if (!staffMember) {
      throw new Error('You must provide a valid staff member id');
    }

    return staffMember;
  }

  async create(data: CreateChildInput, staffMemberId: string) {
    const staffMember = await this.verifyStaffMemberId(staffMemberId);

    return await this.prisma.child.create({
      data: {
        ...data,
        staffs: {
          connect: { id: staffMember.id },
        },
      },
    });
  }

  async findById(childId: string) {
    return await this.prisma.child.findUnique({ where: { id: childId } });
  }

  async findAll() {
    return await this.prisma.child.findMany();
  }

  async findByStaffMemberId(staffMemberId: string) {
    await this.verifyStaffMemberId(staffMemberId);

    return await this.prisma.child.findMany({
      where: { staffs: { some: { id: staffMemberId } } },
    });
  }
}
