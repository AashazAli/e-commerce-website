import { prisma } from "../../lib/prisma";
import { AppError } from "../../core/errors/AppError";

import { OrderRepository } from "./order.repository";

import {
    CreateOrderDTO,
    UpdateOrderStatusDTO
} from "./order.dto";

const repository = new OrderRepository();

export class OrderService {

    async createOrder(
        userId: number,
        data: CreateOrderDTO
    ) {

        // 1. Verify address belongs to the user

        const address = await repository.findUserAddress(
            data.addressId,
            userId
        );

        if (!address) {

            throw new AppError(
                "Address not found",
                404
            );

        }


        // 2. Get user's cart

        const cart = await repository.getUserCart(userId);


        // 3. Check cart exists

        if (!cart) {

            throw new AppError(
                "Cart not found",
                404
            );

        }


        // 4. Check cart isn't empty

        if (cart.items.length === 0) {

            throw new AppError(
                "Cart is empty",
                400
            );

        }


        // 5. Check inventory and calculate subtotal

        let subtotal = 0;

        for (const item of cart.items) {

            const inventory = item.product.inventory;

            if (!inventory) {

                throw new AppError(
                    `Inventory not found for product ${item.productId}`,
                    400
                );

            }


            if (inventory.quantity < item.quantity) {

                throw new AppError(
                    `Insufficient stock for product ${item.productId}`,
                    400
                );

            }


            const price = Number(item.product.price);

            subtotal += price * item.quantity;

        }


        // 6. Calculate tax

        const tax = subtotal * 0.18;


        // 7. Shipping

        const shipping = subtotal >= 1000 ? 0 : 100;


        // 8. Calculate total

        const total =
            subtotal +
            tax +
            shipping;


        // 9. Generate order number

        const orderNumber =
            `ORD-${Date.now()}-${Math.floor(
                Math.random() * 1000
            )}`;


        // 10. Create everything inside one transaction

        const order = await prisma.$transaction(async (tx) => {

            // Create Order

            const newOrder = await tx.order.create({

                data: {

                    orderNumber,

                    userId,

                    status: "PENDING",

                    subtotal,

                    tax,

                    shipping,

                    total,

                    paymentMethod:
                        data.paymentMethod ?? null,

                    paymentStatus: "Pending",

                    addressId: data.addressId

                }

            });


            // Create Order Items

            for (const item of cart.items) {

                const price =
                    Number(item.product.price);

                const itemTotal =
                    price * item.quantity;


                await tx.orderItem.create({

                    data: {

                        orderId: newOrder.id,

                        productId:
                            item.productId,

                        quantity:
                            item.quantity,

                        price,

                        total:
                            itemTotal

                    }

                });


                // Reduce inventory

                await tx.inventory.update({

                    where: {

                        productId:
                            item.productId

                    },

                    data: {

                        quantity: {

                            decrement:
                                item.quantity

                        }

                    }

                });

            }


            // Clear cart items

            await tx.cartItem.deleteMany({

                where: {

                    cartId: cart.id

                }

            });


            // Return complete order

            return tx.order.findUnique({

                where: {

                    id: newOrder.id

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

        });


        return order;

    }


    // Get all orders belonging to the user

    async getMyOrders(userId: number) {

        return repository.findUserOrders(
            userId
        );

    }


    // Get a single order belonging to the user

    async getMyOrder(
        orderId: number,
        userId: number
    ) {

        const order =
            await repository.findUserOrder(
                orderId,
                userId
            );


        if (!order) {

            throw new AppError(
                "Order not found",
                404
            );

        }


        return order;

    }


    // Update order status

    async updateOrderStatus(
        orderId: number,
        status: UpdateOrderStatusDTO["status"]
    ) {

        const order =
            await prisma.order.findUnique({

                where: {

                    id: orderId

                }

            });


        if (!order) {

            throw new AppError(
                "Order not found",
                404
            );

        }


        return repository.updateStatus(
            orderId,
            status
        );

    }


    // Delete order

    async deleteOrder(
        orderId: number
    ) {

        const order =
            await prisma.order.findUnique({

                where: {

                    id: orderId

                }

            });


        if (!order) {

            throw new AppError(
                "Order not found",
                404
            );

        }


        await repository.deleteOrder(
            orderId
        );

    }

    async cancelOrder(
    orderId: number,
    userId: number
) {

    const order = await prisma.order.findFirst({

        where: {
            id: orderId,
            userId
        }

    });

    if (!order) {

        throw new AppError(
            "Order not found",
            404
        );

    }


    // Only pending orders can be cancelled

    if (order.status !== "PENDING") {

        throw new AppError(
            "Order cannot be cancelled at this stage",
            400
        );

    }


    const cancelledOrder =
        await prisma.$transaction(async (tx) => {

            // Change order status

            const updatedOrder =
                await tx.order.update({

                    where: {
                        id: orderId
                    },

                    data: {
                        status: "CANCELLED"
                    }

                });


            // Restore inventory

            const items =
                await tx.orderItem.findMany({

                    where: {
                        orderId
                    }

                });


            for (const item of items) {

                await tx.inventory.update({

                    where: {
                        productId: item.productId
                    },

                    data: {

                        quantity: {
                            increment: item.quantity
                        }

                    }

                });

            }


            return updatedOrder;

        });


    return cancelledOrder;

}

async getAllOrders() {

    return repository.findAllOrders();

}

async getOrderById(
    orderId: number
) {

    const order =
        await repository.findOrderById(
            orderId
        );


    if (!order) {

        throw new AppError(
            "Order not found",
            404
        );

    }


    return order;

}

}