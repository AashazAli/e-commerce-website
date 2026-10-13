import { prisma } from "../../lib/prisma";

import { BaseRepository } from "../../core/repositories/base.repository";

import {
    CreateInventoryDTO,
    UpdateInventoryDTO
} from "./inventory.dto";

export class InventoryRepository extends BaseRepository<
    CreateInventoryDTO,
    UpdateInventoryDTO
>{

    constructor() {

        super(prisma.inventory);

    }

    async findAll() {

        return prisma.inventory.findMany({

            include: {

                product: true

            },

            orderBy: {

                updatedAt: "desc"

            }

        });

    }

    async findByProductId(productId: number) {

        return prisma.inventory.findUnique({

            where: {

                productId

            },

            include: {

                product: true

            }

        });

    }

    async addStock(productId: number, quantity: number) {

        return prisma.inventory.update({

            where: {

                productId

            },

            data: {

                quantity: {

                    increment: quantity

                }

            }

        });

    }

    async removeStock(productId: number, quantity: number) {

        return prisma.inventory.update({

            where: {

                productId

            },

            data: {

                quantity: {

                    decrement: quantity

                }

            }

        });

    }

    async getLowStock() {

    const inventory = await prisma.inventory.findMany({

        include: {

            product: true

        }

    });

    return inventory.filter(

        item => item.quantity <= item.minimumStock

    );

}

}
