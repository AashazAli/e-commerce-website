import { prisma } from "../../lib/prisma";

import { BaseRepository } from "../../core/repositories/base.repository";

import {
    CreateProductSpecificationDTO,
    UpdateProductSpecificationDTO
} from "./productspecification.dto";

export class ProductSpecificationRepository extends BaseRepository<
    CreateProductSpecificationDTO,
    UpdateProductSpecificationDTO
>{

    constructor() {

        super(prisma.productSpecification);

    }

    async findAll() {

        return prisma.productSpecification.findMany({

            include: {

                product: true

            },

            orderBy: {

                createdAt: "desc"

            }

        });

    }

    async findByProductId(productId: number) {

        return prisma.productSpecification.findMany({

            where: {

                productId

            },

            orderBy: {

                specKey: "asc"

            }

        });

    }

    async findByProductAndKey(
    productId: number,
    specKey: string
) {

    return prisma.productSpecification.findFirst({

        where: {

            productId,

            specKey

        }

    });

}

}