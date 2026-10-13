import { prisma } from "../../lib/prisma";

import { BaseRepository } from "../../core/repositories/base.repository";

import {
    CreateProductImageDTO,
    UpdateProductImageDTO
} from "./productimage.dto";

export class ProductImageRepository extends BaseRepository<
    CreateProductImageDTO,
    UpdateProductImageDTO
>{

    constructor() {

        super(prisma.productImage);

    }

    async findAll() {

        return prisma.productImage.findMany({

            include: {

                product: true

            },

            orderBy: {

                createdAt: "desc"

            }

        });

    }

    async findByProductId(productId: number) {

        return prisma.productImage.findMany({

            where: {

                productId

            },

            orderBy: [

                {
                    isPrimary: "desc"
                },

                {
                    createdAt: "asc"
                }

            ]

        });

    }

    async clearPrimaryImage(productId: number) {

        return prisma.productImage.updateMany({

            where: {

                productId,

                isPrimary: true

            },

            data: {

                isPrimary: false

            }

        });

    }

}