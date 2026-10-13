import { z } from "zod";

export const createProductSchema = z.object({

    name: z.string().min(2),

    slug: z.string().min(2),

    sku: z.string().min(1),

    type: z.enum([
        "SCOOTER",
        "SPARE_PART",
        "ACCESSORY"
    ]),

    description: z.string(),

    shortDescription: z.string().optional(),

    price: z.coerce.number(),

    salePrice: z.coerce.number().optional(),

    stock: z.coerce.number().int(),

    thumbnail: z.string(),

    isFeatured: z.boolean().optional(),

    isActive: z.boolean().optional(),

    brandId: z.coerce.number().int(),

    categoryId: z.coerce.number().int(),

    modelId: z.coerce.number().int().optional()

});

export const updateProductSchema =
    createProductSchema.partial();