/* eslint-disable no-console */
import { PrismaClient, GenderOptions, RoleOptions, Prisma } from '@prisma/client';

import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedProfessionals() {
  const professions = [
    'Therapist Assistant',
    'Early Intervention Specialist',
    'Developmental Practician',
    'Occupational Therapist',
    'Behavior Specialist',
    'Psychologist',
    'Speech Language Pathologist',
  ];

  for (const profession of professions) {
    await prisma.professions.create({
      data: { title: profession },
    });
  }
  console.log('Seeded professionals successfully');
}

async function seedRoles() {
  const Roles = [RoleOptions.ADMIN, RoleOptions.STAFF, RoleOptions.PARENT];

  for (const role of Roles) {
    await prisma.role.create({
      data: { name: role },
    });
  }
  console.log('Seeded roles successfully');
}

async function seedUsers() {
  const users: Prisma.UserCreateInput[] = [
    {
      name: 'Admin Master',
      email: 'admin@devault.com',
      password: bcrypt.hashSync('123456', 10),
      birthday: new Date('1990-01-01'),
      gender: GenderOptions.MALE,
      role: {
        connectOrCreate: {
          where: { name: RoleOptions.ADMIN },
          create: { name: RoleOptions.ADMIN },
        },
      },
    },
    {
      name: 'Staff Master',
      email: 'staff@devault.com',
      password: bcrypt.hashSync('123456', 10),
      birthday: new Date('1990-01-01'),
      gender: GenderOptions.FEMALE,
      role: {
        connectOrCreate: {
          where: { name: RoleOptions.STAFF },
          create: { name: RoleOptions.STAFF },
        },
      },
    },
    {
      name: 'Parent Master',
      email: 'Parent@devault.com',
      password: bcrypt.hashSync('123456', 10),
      birthday: new Date('1990-01-01'),
      gender: GenderOptions.NOT_INFORMED,
      role: {
        connectOrCreate: {
          where: { name: RoleOptions.PARENT },
          create: { name: RoleOptions.PARENT },
        },
      },
    },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  console.log('Seeded users successfully');
}

async function seed() {
  await seedRoles();
  await seedUsers();
  await seedProfessionals();
}

seed()
  .then(() => console.log('Seeded all successfully'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
