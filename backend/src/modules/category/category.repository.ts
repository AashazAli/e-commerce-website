import { prisma } from "../../lib/prisma";

import { BaseRepository } from "../../core/repositories/base.repository";

import {
    CreateCategoryDTO,
    UpdateCategoryDTO
} from "./category.dto";

export class CategoryRepository extends BaseRepository<
    CreateCategoryDTO,
    UpdateCategoryDTO
> {

    constructor() {

        super(prisma.category);

    }

    async findAll() {

        return prisma.category.findMany({

            orderBy: {

                name: "asc"

            }

        });

    }

}