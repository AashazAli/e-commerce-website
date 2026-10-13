import { prisma } from "../../lib/prisma";

import { BaseRepository } from "../../core/repositories/base.repository";

import {

    CreateAddressDTO,

    UpdateAddressDTO

} from "./address.dto";

export class AddressRepository extends BaseRepository<

    CreateAddressDTO,

    UpdateAddressDTO

>{

    constructor() {

        super(prisma.address);

    }

    async findByUser(userId: number) {

        return prisma.address.findMany({

            where: {

                userId

            },

            orderBy: {

                createdAt: "desc"

            }

        });

    }

    async findUserAddress(

        id: number,

        userId: number

    ) {

        return prisma.address.findFirst({

            where: {

                id,

                userId

            }

        });

    }

    async countUserAddresses(userId: number) {

        return prisma.address.count({

            where: {

                userId

            }

        });

    }

    async clearDefault(userId: number) {

        return prisma.address.updateMany({

            where: {

                userId,

                isDefault: true

            },

            data: {

                isDefault: false

            }

        });

    }

    async setDefault(

        id: number,

        userId: number

    ) {

        return prisma.$transaction(async (tx) => {

            await tx.address.updateMany({

                where: {

                    userId,

                    isDefault: true

                },

                data: {

                    isDefault: false

                }

            });

            return tx.address.update({

                where: {

                    id

                },

                data: {

                    isDefault: true

                }

            });

        });

    }

}