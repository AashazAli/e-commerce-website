import { z } from "zod";

export const createOrderSchema = z.object({

    addressId: z.number().int().positive(),

    paymentMethod: z.string().optional()

});

export const updateOrderStatusSchema = z.object({

    status: z.enum([
        "PENDING",
        "CONFIRMED",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED"
    ])

});