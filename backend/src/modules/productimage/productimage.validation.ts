import { z } from "zod";

export const createProductImageSchema = z.object({

    productId: z.coerce.number().int(),

    imageUrl: z
        .string()
        .url("Invalid image URL"),

    altText: z
        .string()
        .optional(),

    isPrimary: z
        .boolean()
        .optional()

});

export const updateProductImageSchema =
    createProductImageSchema.partial();