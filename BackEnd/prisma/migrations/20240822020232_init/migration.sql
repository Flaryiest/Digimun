-- CreateTable
CREATE TABLE "Caucus" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER,
    "text" TEXT,
    "code" TEXT,
    "motionType" "MotionType" NOT NULL DEFAULT 'open_unmoderated_caucus',
    "time" TEXT NOT NULL,
    "speakingTime" TEXT,
    "committeeId" INTEGER NOT NULL,
    "country" TEXT,

    CONSTRAINT "Caucus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Caucus" ADD CONSTRAINT "Caucus_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caucus" ADD CONSTRAINT "Caucus_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
