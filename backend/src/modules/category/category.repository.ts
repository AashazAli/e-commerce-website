import { prisma } from "../../lib/prisma";
import { CreateCategoryDTO, UpdateCategoryDTO } from "./category.dto";

export class CategoryRepository {

    create(data: CreateCategoryDTO) {
        return prisma.category.create({
            data
        });
    }

    findAll() {
        return prisma.category.findMany({
            orderBy: {
                name: "asc"
            }
        });
    }

    findById(id: number) {
        return prisma.category.findUnique({
            where: {
                id
            }
        });
    }

    update(id: number, data: UpdateCategoryDTO) {
        return prisma.category.update({
            where: {
                id
            },
            data
        });
    }

    delete(id: number) {
        return prisma.category.delete({
            where: {
                id
            }
        });
    }
}