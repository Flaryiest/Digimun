/*
  Warnings:

  - You are about to drop the column `userId` on the `Committee` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'viewer';

-- DropForeignKey
ALTER TABLE "Committee" DROP CONSTRAINT "Committee_userId_fkey";

-- AlterTable
ALTER TABLE "Committee" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_UserCommittees" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserCommittees_AB_unique" ON "_UserCommittees"("A", "B");

-- CreateIndex
CREATE INDEX "_UserCommittees_B_index" ON "_UserCommittees"("B");

-- AddForeignKey
ALTER TABLE "_UserCommittees" ADD CONSTRAINT "_UserCommittees_A_fkey" FOREIGN KEY ("A") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCommittees" ADD CONSTRAINT "_UserCommittees_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
