import { z } from "zod";

export const addToCartSchema = z.object({

    productId: z.coerce.number().int(),

    quantity: z.coerce.number().int().min(1)

});

export const updateQuantitySchema = z.object({

    quantity: z.coerce.number().int().min(1)

});