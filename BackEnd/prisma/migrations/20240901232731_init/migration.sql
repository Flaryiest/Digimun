/*
  Warnings:

  - You are about to drop the column `country` on the `Caucus` table. All the data in the column will be lost.
  - You are about to drop the column `caucusId` on the `Country` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_caucusId_fkey";

-- AlterTable
ALTER TABLE "Caucus" DROP COLUMN "country";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "caucusId";
