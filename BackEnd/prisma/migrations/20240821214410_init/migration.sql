/*
  Warnings:

  - You are about to drop the `_CommitteeToMotion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `committeeId` to the `Motion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CommitteeToMotion" DROP CONSTRAINT "_CommitteeToMotion_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommitteeToMotion" DROP CONSTRAINT "_CommitteeToMotion_B_fkey";

-- AlterTable
ALTER TABLE "Motion" ADD COLUMN     "committeeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CommitteeToMotion";

-- AddForeignKey
ALTER TABLE "Motion" ADD CONSTRAINT "Motion_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
