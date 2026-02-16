-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reviewsListId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewsListId_fkey" FOREIGN KEY ("reviewsListId") REFERENCES "ReviewsList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
