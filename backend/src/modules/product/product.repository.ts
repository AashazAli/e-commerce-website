import { prisma } from "../../lib/prisma";

import { BaseRepository } from "../../core/repositories/base.repository";

import {
    CreateProductDTO,
    UpdateProductDTO
} from "./product.dto";

export class ProductRepository extends BaseRepository<
    CreateProductDTO,
    UpdateProductDTO
>{

    constructor() {

        super(prisma.product);

    }

    async findAll() {

        return prisma.product.findMany({

            include: {

                brand: true,

                category: true,

                scooterModel: true

            },

            orderBy: {

                createdAt: "desc"

            }

        });

    }

    async findById(id: number) {

    return prisma.product.findUnique({

        where: {

            id

        },

        include: {

            brand: true,

            category: true,

            scooterModel: true,

            images: {

                orderBy: {

                    isPrimary: "desc"

                }

            },

            specifications: {

                orderBy: {

                    specKey: "asc"

                }

            },

            inventory: true

        }

    });

}

}