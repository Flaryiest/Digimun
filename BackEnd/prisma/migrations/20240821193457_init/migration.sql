/*
  Warnings:

  - Added the required column `time` to the `Motion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Motion" ADD COLUMN     "time" TEXT NOT NULL;
