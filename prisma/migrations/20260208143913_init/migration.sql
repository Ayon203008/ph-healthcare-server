/*
  Warnings:

  - Made the column `isDeleted` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "isDeleted" SET NOT NULL;
