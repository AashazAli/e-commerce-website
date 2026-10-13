import { prisma } from "../../lib/prisma";

import { BaseRepository } from "../../core/repositories/base.repository";

import {
    CreateBrandDTO,
    UpdateBrandDTO
} from "./brand.dto";

export class BrandRepository extends BaseRepository<
    CreateBrandDTO,
    UpdateBrandDTO
> {

    constructor() {
        super(prisma.brand);
    }

    async findAll() {

        return prisma.brand.findMany({

            orderBy: {
                name: "asc"
            }

        });

    }

}