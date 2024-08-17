/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Committee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Committee_name_key" ON "Committee"("name");
