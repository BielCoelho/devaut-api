/*
  Warnings:

  - Added the required column `gender` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `birthday` on the `Child` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Child" ADD COLUMN     "gender" "Gender" NOT NULL,
DROP COLUMN "birthday",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL;
