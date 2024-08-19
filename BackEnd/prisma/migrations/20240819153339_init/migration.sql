/*
  Warnings:

  - You are about to drop the column `countryId` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_countryId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "countryId",
ADD COLUMN     "country" TEXT,
ADD COLUMN     "countryCode" TEXT;
