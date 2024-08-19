-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "present" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timesSpoken" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "voting" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "workingPaper" TEXT;
