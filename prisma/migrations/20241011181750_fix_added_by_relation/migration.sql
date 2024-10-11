/*
  Warnings:

  - You are about to drop the column `spaceId` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the `Space` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_hostId_fkey";

-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_spaceId_fkey";

-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "spaceId",
ADD COLUMN     "addedBy" TEXT;

-- DropTable
DROP TABLE "Space";

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
