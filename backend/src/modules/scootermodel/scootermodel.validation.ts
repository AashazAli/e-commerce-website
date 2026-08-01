import { z } from "zod";

export const createScooterModelSchema = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().optional(),
    image: z.string().optional(),
    brandId: z.number()
});

export const updateScooterModelSchema =
    createScooterModelSchema.partial();