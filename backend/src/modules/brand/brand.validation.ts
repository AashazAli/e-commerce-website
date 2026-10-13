import { z } from "zod";

export const createBrandSchema = z.object({

    name: z
        .string()
        .min(2, "Brand name must be at least 2 characters"),

    slug: z
        .string()
        .min(2, "Slug is required"),

    logo: z
        .string()
        .optional()

});

export const updateBrandSchema = createBrandSchema.partial();