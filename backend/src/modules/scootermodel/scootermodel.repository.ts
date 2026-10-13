import { prisma } from "../../lib/prisma";

import { BaseRepository } from "../../core/repositories/base.repository";

import {
    CreateScooterModelDTO,
    UpdateScooterModelDTO
} from "./scootermodel.dto";

export class ScooterModelRepository extends BaseRepository<
    CreateScooterModelDTO,
    UpdateScooterModelDTO
>{

    constructor() {
        super(prisma.scooterModel);
    }

    async findAll() {

        return prisma.scooterModel.findMany({

            include: {

                brand: true

            },

            orderBy: {

                name: "asc"

            }

        });

    }

    async findById(id: number) {

        return prisma.scooterModel.findUnique({

            where: { id },

            include: {

                brand: true

            }

        });

    }

}