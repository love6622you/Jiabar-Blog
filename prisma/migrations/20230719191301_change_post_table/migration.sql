/*
  Warnings:

  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `_PostCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PostCategory" DROP CONSTRAINT "_PostCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostCategory" DROP CONSTRAINT "_PostCategory_B_fkey";

-- AlterTable
ALTER TABLE "Post" RENAME COLUMN "userId" TO "authorId";
ALTER TABLE "Post" ADD COLUMN "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PostCategory";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
