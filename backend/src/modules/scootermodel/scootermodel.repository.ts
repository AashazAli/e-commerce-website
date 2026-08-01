import { prisma } from "../../lib/prisma";
import {
    CreateScooterModelDTO,
    UpdateScooterModelDTO
} from "./scootermodel.dto";

export class ScooterModelRepository {

    create(data: CreateScooterModelDTO) {
        return prisma.scooterModel.create({
            data
        });
    }

    findAll() {
        return prisma.scooterModel.findMany({
            include: {
                brand: true
            },
            orderBy: {
                name: "asc"
            }
        });
    }

    findById(id: number) {
        return prisma.scooterModel.findUnique({
            where: { id },
            include: {
                brand: true
            }
        });
    }

    update(id: number, data: UpdateScooterModelDTO) {
        return prisma.scooterModel.update({
            where: { id },
            data
        });
    }

    delete(id: number) {
        return prisma.scooterModel.delete({
            where: { id }
        });
    }
}