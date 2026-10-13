import { prisma } from "../../lib/prisma";

import {
    CreateServiceDTO,
    UpdateServiceDTO
} from "./service.dto";


export class ServiceRepository {


    async create(
        data: CreateServiceDTO
    ) {

        return prisma.service.create({

            data

        });

    }


    async findAll() {

        return prisma.service.findMany({

            orderBy: {
                createdAt: "desc"
            }

        });

    }


    async findActive() {

        return prisma.service.findMany({

            where: {
                isActive: true
            },

            orderBy: {
                createdAt: "desc"
            }

        });

    }


    async findById(
        id: number
    ) {

        return prisma.service.findUnique({

            where: {
                id
            }

        });

    }


    async update(
        id: number,
        data: UpdateServiceDTO
    ) {

        return prisma.service.update({

            where: {
                id
            },

            data

        });

    }


    async delete(
        id: number
    ) {

        return prisma.service.delete({

            where: {
                id
            }

        });

    }

}