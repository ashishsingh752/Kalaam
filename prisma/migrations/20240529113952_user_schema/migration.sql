/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roll_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roll_number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "roll_number" VARCHAR(9) NOT NULL,
ADD COLUMN     "name" VARCHAR(60) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_roll_number_key" ON "User"("roll_number");
