/*
  Warnings:

  - You are about to drop the column `scooterModelId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_modelId_fkey`;

-- DropIndex
DROP INDEX `Product_modelId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `scooterModelId`,
    ADD COLUMN `warranty` VARCHAR(191) NULL,
    ADD COLUMN `weight` DOUBLE NULL,
    MODIFY `modelId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `ScooterModel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
