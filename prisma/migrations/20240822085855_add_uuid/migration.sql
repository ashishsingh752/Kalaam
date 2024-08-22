/*
  Warnings:

  - A unique constraint covering the columns `[post_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - The required column `post_id` was added to the `Post` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "post_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_post_id_key" ON "Post"("post_id");
