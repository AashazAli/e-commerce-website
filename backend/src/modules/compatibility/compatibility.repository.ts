import { prisma } from "../../lib/prisma";

import { BaseRepository } from "../../core/repositories/base.repository";

import {
    CreateCompatibilityDTO,
    UpdateCompatibilityDTO
} from "./compatibility.dto";

export class CompatibilityRepository extends BaseRepository<
    CreateCompatibilityDTO,
    UpdateCompatibilityDTO
>{

    constructor() {

        super(prisma.compatibility);

    }

    async findAll() {

        return prisma.compatibility.findMany({

            include: {

                product: true,

                scooterModel: true

            }

        });

    }

    async findByProduct(productId: number) {

        return prisma.compatibility.findMany({

            where: {

                productId

            },

            include: {

                scooterModel: true

            }

        });

    }

    async findByScooterModel(
        scooterModelId: number
    ) {

        return prisma.compatibility.findMany({

            where: {

                scooterModelId

            },

            include: {

                product: true

            }

        });

    }

    async findPair(
        productId: number,
        scooterModelId: number
    ) {

        return prisma.compatibility.findUnique({

            where: {

                productId_scooterModelId: {

                    productId,

                    scooterModelId

                }

            }

        });

    }

}