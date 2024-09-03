-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "caucusId" INTEGER;

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_caucusId_fkey" FOREIGN KEY ("caucusId") REFERENCES "Caucus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
