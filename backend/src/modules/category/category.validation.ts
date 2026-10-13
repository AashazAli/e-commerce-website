import { z } from "zod";

export const createCategorySchema = z.object({

    name: z
        .string()
        .min(2, "Category name must be at least 2 characters"),

    slug: z
        .string()
        .min(2, "Slug is required"),

    description: z
        .string()
        .optional()

});

export const updateCategorySchema =
    createCategorySchema.partial();