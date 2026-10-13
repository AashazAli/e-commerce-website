import { WishlistRepository } from "./wishlist.repository";

import { prisma } from "../../lib/prisma";

import { AppError } from "../../core/errors/AppError";

const repository = new WishlistRepository();

export class WishlistService {

    async getWishlist(userId: number) {

        return repository.getWishlist(userId);

    }

    async add(
        userId: number,
        productId: number
    ) {

        const product = await prisma.product.findUnique({

            where: {

                id: productId

            }

        });

        if (!product) {

            throw new AppError(

                "Product not found",

                404

            );

        }

        const existing = await repository.findItem(

            userId,

            productId

        );

        if (existing) {

            throw new AppError(

                "Product already in wishlist",

                409

            );

        }

        return repository.add(

            userId,

            productId

        );

    }

    async remove(
        userId: number,
        productId: number
    ) {

        const existing = await repository.findItem(

            userId,

            productId

        );

        if (!existing) {

            throw new AppError(

                "Wishlist item not found",

                404

            );

        }

        return repository.remove(

            userId,

            productId

        );

    }

}