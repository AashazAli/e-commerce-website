import { BaseService } from "../../core/services/base.service";

import { AppError } from "../../core/errors/AppError";

import { InventoryRepository } from "./inventory.repository";

import {
    CreateInventoryDTO,
    UpdateInventoryDTO
} from "./inventory.dto";

const repository = new InventoryRepository();

export class InventoryService extends BaseService<
    CreateInventoryDTO,
    UpdateInventoryDTO
>{

    constructor() {

        super(repository);

    }

    async getByProductId(productId: number) {

        const inventory =
            await repository.findByProductId(productId);

        if (!inventory) {

            throw new AppError(
                "Inventory not found",
                404
            );

        }

        return inventory;

    }

    async addStock(
        productId: number,
        quantity: number
    ) {

        const inventory =
            await repository.findByProductId(productId);

        if (!inventory) {

            throw new AppError(
                "Inventory not found",
                404
            );

        }

        return repository.addStock(
            productId,
            quantity
        );

    }

    async removeStock(
        productId: number,
        quantity: number
    ) {

        const inventory =
            await repository.findByProductId(productId);

        if (!inventory) {

            throw new AppError(
                "Inventory not found",
                404
            );

        }

        if (inventory.quantity < quantity) {

            throw new AppError(
                "Insufficient stock",
                400
            );

        }

        return repository.removeStock(
            productId,
            quantity
        );

    }

    async getLowStock() {

        return repository.getLowStock();

    }

    async create(data: CreateInventoryDTO) {

    const existing = await repository.findByProductId(
        data.productId
    );

    if (existing) {

        throw new AppError(
            "Inventory already exists for this product",
            409
        );

    }

    return repository.create(data);

}

}