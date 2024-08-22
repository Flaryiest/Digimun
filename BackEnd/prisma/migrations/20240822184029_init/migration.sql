/*
  Warnings:

  - The `time` column on the `Caucus` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `speakingTime` column on the `Caucus` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `time` column on the `Motion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `speakingTime` column on the `Motion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Caucus" ADD COLUMN     "totalTime" INTEGER NOT NULL DEFAULT 600,
DROP COLUMN "time",
ADD COLUMN     "time" INTEGER NOT NULL DEFAULT 600,
DROP COLUMN "speakingTime",
ADD COLUMN     "speakingTime" INTEGER NOT NULL DEFAULT 60;

-- AlterTable
ALTER TABLE "Committee" ADD COLUMN     "totalUnmodTime" INTEGER NOT NULL DEFAULT 600,
ADD COLUMN     "unmodTime" INTEGER NOT NULL DEFAULT 600;

-- AlterTable
ALTER TABLE "Motion" DROP COLUMN "time",
ADD COLUMN     "time" INTEGER NOT NULL DEFAULT 600,
DROP COLUMN "speakingTime",
ADD COLUMN     "speakingTime" INTEGER DEFAULT 60;
