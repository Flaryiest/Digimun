/*
  Warnings:

  - You are about to drop the column `profileId` on the `Caucus` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Caucus" DROP CONSTRAINT "Caucus_profileId_fkey";

-- AlterTable
ALTER TABLE "Caucus" DROP COLUMN "profileId";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "caucusId" INTEGER;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_caucusId_fkey" FOREIGN KEY ("caucusId") REFERENCES "Caucus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
