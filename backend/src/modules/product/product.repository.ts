import { prisma } from "../../lib/prisma";

import {
    CreateProductDTO,
    UpdateProductDTO
} from "./product.dto";

export class ProductRepository {

    async create(data: CreateProductDTO) {

        return prisma.product.create({

            data,

            include: {

                brand: true,

                category: true,

                scooterModel: true,

                inventory: true,

                images: true

            }

        });

    }

    async findAll() {

        return prisma.product.findMany({

            include: {

                brand: true,

                category: true,

                scooterModel: true,

                inventory: true,

                images: true

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

                inventory: true,

                images: true,

                specifications: true,

                reviews: {

                    include: {

                        user: true

                    }

                }

            }

        });

    }

    async update(
        id: number,
        data: UpdateProductDTO
    ) {

        return prisma.product.update({

            where: {

                id

            },

            data,

            include: {

                brand: true,

                category: true,

                scooterModel: true,

                inventory: true,

                images: true

            }

        });

    }

    async delete(id: number) {

        return prisma.product.delete({

            where: {

                id

            }

        });

    }

}