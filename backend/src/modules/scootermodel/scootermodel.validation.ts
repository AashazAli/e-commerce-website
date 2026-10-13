import { z } from "zod";

export const createScooterModelSchema = z.object({
    name: z.string().min(2),
    brandId: z.number().int().positive()
});

export const updateScooterModelSchema =
    createScooterModelSchema.partial();