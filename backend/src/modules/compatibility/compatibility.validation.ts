import { z } from "zod";

export const createCompatibilitySchema = z.object({

    productId: z.coerce.number().int(),

    scooterModelId: z.coerce.number().int()

});

export const updateCompatibilitySchema =
    createCompatibilitySchema.partial();