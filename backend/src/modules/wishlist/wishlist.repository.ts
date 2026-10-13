import { prisma } from "../../lib/prisma";
import { BaseRepository } from "../../core/repositories/base.repository";
import {
    CreateWishlistDTO,
    UpdateWishlistDTO
} from "./wishlist.dto";

export class WishlistRepository extends BaseRepository<CreateWishlistDTO, UpdateWishlistDTO> {

    constructor() {
        super(prisma.wishlist);
    }

    async getWishlist(userId: number) {

        return prisma.wishlist.findMany({

            where: {

                userId

            },

            include: {

                product: {

                    include: {

                        brand: true,

                        category: true,

                        images: {

                            where: {

                                isPrimary: true

                            }

                        },

                        inventory: true

                    }

                }

            }

        });

    }



    async findItem(
        userId:number,
        productId:number
    ){

        return prisma.wishlist.findUnique({

            where: {

                userId_productId: {

                    userId,

                    productId

                }

            }

        });

    }



    async add(
        userId:number,
        productId:number
    ){

        return prisma.wishlist.create({

            data: {

                userId,

                productId

            }

        });

    }



    async remove(
        userId:number,
        productId:number
    ){

        return prisma.wishlist.delete({

            where: {

                userId_productId: {

                    userId,

                    productId

                }

            }

        });

    }


}