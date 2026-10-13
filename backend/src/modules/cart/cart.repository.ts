import { prisma } from "../../lib/prisma";

export class CartRepository {

    // ===========================
    // Cart
    // ===========================

    async getCart(userId: number) {

        return prisma.cart.findUnique({

            where: {
                userId
            },

            include: {

                items: {

                    include: {

                        product: {

                            include: {

                                brand: true,

                                category: true,

                                inventory: true,

                                images: {

                                    where: {
                                        isPrimary: true
                                    }

                                }

                            }

                        }

                    }

                }

            }

        });

    }

    async createCart(userId: number) {

        return prisma.cart.create({

            data: {
                userId
            }

        });

    }

    async getOrCreateCart(userId: number) {

        let cart = await this.getCart(userId);

        if (!cart) {

            await this.createCart(userId);

            cart = await this.getCart(userId);

        }

        return cart!;

    }

    // ===========================
    // Cart Items
    // ===========================

    async findCartItem(
        cartId: number,
        productId: number
    ) {

        return prisma.cartItem.findUnique({

            where: {

                cartId_productId: {

                    cartId,

                    productId

                }

            }

        });

    }

    async createCartItem(
        cartId: number,
        productId: number,
        quantity: number
    ) {

        return prisma.cartItem.create({

            data: {

                cartId,

                productId,

                quantity

            }

        });

    }

    async updateQuantity(
        cartItemId: number,
        quantity: number
    ) {

        return prisma.cartItem.update({

            where: {

                id: cartItemId

            },

            data: {

                quantity

            }

        });

    }

    async incrementQuantity(
        cartItemId: number,
        quantity: number
    ) {

        return prisma.cartItem.update({

            where: {

                id: cartItemId

            },

            data: {

                quantity: {

                    increment: quantity

                }

            }

        });

    }

    async decrementQuantity(
        cartItemId: number,
        quantity: number
    ) {

        return prisma.cartItem.update({

            where: {

                id: cartItemId

            },

            data: {

                quantity: {

                    decrement: quantity

                }

            }

        });

    }

    async deleteCartItem(
        cartItemId: number
    ) {

        return prisma.cartItem.delete({

            where: {

                id: cartItemId

            }

        });

    }

    async clearCart(cartId: number) {

        return prisma.cartItem.deleteMany({

            where: {

                cartId

            }

        });

    }

}