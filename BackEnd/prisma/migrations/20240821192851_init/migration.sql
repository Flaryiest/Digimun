-- CreateTable
CREATE TABLE "_CommitteeToMotion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommitteeToMotion_AB_unique" ON "_CommitteeToMotion"("A", "B");

-- CreateIndex
CREATE INDEX "_CommitteeToMotion_B_index" ON "_CommitteeToMotion"("B");

-- AddForeignKey
ALTER TABLE "_CommitteeToMotion" ADD CONSTRAINT "_CommitteeToMotion_A_fkey" FOREIGN KEY ("A") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommitteeToMotion" ADD CONSTRAINT "_CommitteeToMotion_B_fkey" FOREIGN KEY ("B") REFERENCES "Motion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
