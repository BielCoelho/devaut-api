/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
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
}

main()
  .then(async () => {
    console.log('Seeded professions successfully');
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
