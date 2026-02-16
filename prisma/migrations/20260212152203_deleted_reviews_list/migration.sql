/*
  Warnings:

  - You are about to drop the column `reviewsListId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `ReviewsList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reviewsListId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "reviewsListId";

-- DropTable
DROP TABLE "ReviewsList";
