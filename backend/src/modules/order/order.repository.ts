import { prisma } from "../../lib/prisma";

import { BaseRepository } from "../../core/repositories/base.repository";

import {
    CreateOrderDTO,
    UpdateOrderStatusDTO
} from "./order.dto";

export class OrderRepository extends BaseRepository<
    CreateOrderDTO,
    UpdateOrderStatusDTO
> {

    constructor() {
        super(prisma.order);
    }

    // Get user's cart with product and inventory information
    async getUserCart(userId: number) {

        return prisma.cart.findUnique({

            where: {
                userId
            },

            include: {

                items: {

                    include: {

                        product: {

                            include: {

                                inventory: true

                            }

                        }

                    }

                }

            }

        });

    }

    // Check whether the address belongs to the user
    async findUserAddress(
        addressId: number,
        userId: number
    ) {

        return prisma.address.findFirst({

            where: {

                id: addressId,

                userId

            }

        });

    }

    // Get one order belonging to a specific user
    async findUserOrder(
        orderId: number,
        userId: number
    ) {

        return prisma.order.findFirst({

            where: {

                id: orderId,

                userId

            },

            include: {

                items: {

                    include: {

                        product: true

                    }

                },

                address: true

            }

        });

    }

    // Get all orders belonging to a user
    async findUserOrders(userId: number) {

        return prisma.order.findMany({

            where: {

                userId

            },

            include: {

                items: {

                    include: {

                        product: true

                    }

                },

                address: true

            },

            orderBy: {

                createdAt: "desc"

            }

        });

    }

    // Find order by order number
    async findByOrderNumber(orderNumber: string) {

        return prisma.order.findUnique({

            where: {

                orderNumber

            },

            include: {

                items: true,

                address: true

            }

        });

    }

    // Update order status
    async updateStatus(
        orderId: number,
        status: UpdateOrderStatusDTO["status"]
    ) {

        return prisma.order.update({

            where: {

                id: orderId

            },

            data: {

                status

            }

        });

    }

    // Delete an order
    async deleteOrder(orderId: number) {

        return prisma.order.delete({

            where: {

                id: orderId

            }

        });

    }

    async findAllOrders() {

    return prisma.order.findMany({

        orderBy: {
            createdAt: "desc"
        },

        include: {

            user: true,

            address: true,

            items: {

                include: {

                    product: true

                }

            }

        }

    });

}

async findOrderById(
    orderId: number
) {

    return prisma.order.findUnique({

        where: {
            id: orderId
        },

        include: {

            user: true,

            address: true,

            items: {

                include: {

                    product: true

                }

            }

        }

    });

}

}