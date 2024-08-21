-- CreateEnum
CREATE TYPE "MotionType" AS ENUM ('open_moderated_caucus', 'open_unmoderated_caucus', 'extend_moderated_caucus', 'extend_unmoderated_caucus', 'open_debate', 'close_debate', 'order_draft_resolutions', 'primary_speakers_list', 'secondary_speakers_list');

-- CreateTable
CREATE TABLE "Motion" (
    "id" SERIAL NOT NULL,
    "text" TEXT,
    "motionType" "MotionType" NOT NULL DEFAULT 'open_unmoderated_caucus',
    "profileId" INTEGER,

    CONSTRAINT "Motion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Motion" ADD CONSTRAINT "Motion_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
