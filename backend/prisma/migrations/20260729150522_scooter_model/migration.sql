/*
  Warnings:

  - You are about to drop the column `battery` on the `scootermodel` table. All the data in the column will be lost.
  - You are about to drop the column `chargingTime` on the `scootermodel` table. All the data in the column will be lost.
  - You are about to drop the column `range` on the `scootermodel` table. All the data in the column will be lost.
  - You are about to drop the column `topSpeed` on the `scootermodel` table. All the data in the column will be lost.
  - Added the required column `modelId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_scooterModelId_fkey`;

-- DropIndex
DROP INDEX `Product_scooterModelId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `modelId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `scootermodel` DROP COLUMN `battery`,
    DROP COLUMN `chargingTime`,
    DROP COLUMN `range`,
    DROP COLUMN `topSpeed`,
    ADD COLUMN `description` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `ScooterModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
