import { z } from "zod";

export const createProductSpecificationSchema = z.object({

    productId: z.coerce.number().int(),

    specKey: z
        .string()
        .min(1, "Specification key is required"),

    specValue: z
        .string()
        .min(1, "Specification value is required")

});

export const updateProductSpecificationSchema =
    createProductSpecificationSchema.partial();