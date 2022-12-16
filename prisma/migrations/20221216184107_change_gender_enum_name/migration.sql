/*
  Warnings:

  - Changed the type of `gender` on the `Child` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GenderOptions" AS ENUM ('MALE', 'FEMALE', 'NOT_INFORMED');

-- AlterTable
ALTER TABLE "Child" DROP COLUMN "gender",
ADD COLUMN     "gender" "GenderOptions" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gender",
ADD COLUMN     "gender" "GenderOptions" NOT NULL;

-- DropEnum
DROP TYPE "Gender";
