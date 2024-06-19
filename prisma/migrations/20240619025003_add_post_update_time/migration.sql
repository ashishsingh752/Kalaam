/*
  Warnings:

  - Added the required column `update_at` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- Add the new column with a default value
ALTER TABLE "Post" ADD COLUMN "update_at" TIMESTAMP NOT NULL DEFAULT now();

-- Remove the default value
ALTER TABLE "Post" ALTER COLUMN "update_at" DROP DEFAULT;
