import { z } from "zod";


export const createServiceSchema = z.object({

    name: z
        .string()
        .min(2, "Service name is required")
        .max(100),

    description: z
        .string()
        .optional(),

    price: z
        .number()
        .positive("Price must be greater than 0"),

    duration: z
        .number()
        .int()
        .positive("Duration must be greater than 0"),

    image: z
        .string()
        .optional(),

    isActive: z
        .boolean()
        .optional()

});


export const updateServiceSchema = z.object({

    name: z
        .string()
        .min(2)
        .max(100)
        .optional(),

    description: z
        .string()
        .optional(),

    price: z
        .number()
        .positive()
        .optional(),

    duration: z
        .number()
        .int()
        .positive()
        .optional(),

    image: z
        .string()
        .optional(),

    isActive: z
        .boolean()
        .optional()

});