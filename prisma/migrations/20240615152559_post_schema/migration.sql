/*
  Warnings:

  - Added the required column `heading` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "heading" TEXT NOT NULL,
ALTER COLUMN "image" SET NOT NULL;
