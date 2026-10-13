import { PrismaClient } from "@prisma/client";

export abstract class BaseRepository<
    TCreate,
    TUpdate
> {

    constructor(protected model: any) {}

    async create(data: TCreate) {
        return this.model.create({
            data
        });
    }

    async findAll() {
        return this.model.findMany({
            orderBy: {
                id: "desc"
            }
        });
    }

    async findById(id: number) {
        return this.model.findUnique({
            where: {
                id
            }
        });
    }

    async update(
        id: number,
        data: TUpdate
    ) {

        return this.model.update({

            where: {
                id
            },

            data

        });

    }

    async delete(id: number) {

        return this.model.delete({

            where: {
                id
            }

        });

    }

}