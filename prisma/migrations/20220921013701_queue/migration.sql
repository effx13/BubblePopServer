/*
  Warnings:

  - You are about to drop the column `usedId` on the `queue` table. All the data in the column will be lost.
  - Added the required column `name` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `queue` DROP FOREIGN KEY `Queue_usedId_fkey`;

-- AlterTable
ALTER TABLE `queue` DROP COLUMN `usedId`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
