/*
  Warnings:

  - You are about to drop the column `countries` on the `Caucus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Caucus" DROP COLUMN "countries",
ADD COLUMN     "country" TEXT;

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "caucusId" INTEGER;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_caucusId_fkey" FOREIGN KEY ("caucusId") REFERENCES "Caucus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
