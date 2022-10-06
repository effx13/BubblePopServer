/*
  Warnings:

  - You are about to drop the column `authorId` on the `queue` table. All the data in the column will be lost.
  - Added the required column `usedId` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `queue` DROP FOREIGN KEY `Queue_authorId_fkey`;

-- AlterTable
ALTER TABLE `queue` DROP COLUMN `authorId`,
    ADD COLUMN `usedId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Queue` ADD CONSTRAINT `Queue_usedId_fkey` FOREIGN KEY (`usedId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
