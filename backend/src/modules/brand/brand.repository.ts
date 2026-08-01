import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class BrandRepository {

    async create(data: any) {

        return prisma.brand.create({
            data
        });

    }

    async findAll() {

        return prisma.brand.findMany({
            orderBy: {
                name: "asc"
            }
        });

    }

    async findById(id: number) {

        return prisma.brand.findUnique({
            where: {
                id
            }
        });

    }

    async update(id: number, data: any) {

        return prisma.brand.update({
            where: {
                id
            },
            data
        });

    }

    async delete(id: number) {

        return prisma.brand.delete({
            where: {
                id
            }
        });

    }

}