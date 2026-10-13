import { z } from "zod";

export const createInventorySchema = z.object({

    productId: z.coerce.number().int(),

    quantity: z.coerce.number().int(),

    minimumStock: z.coerce.number().int().optional(),

    warehouseLocation: z.string().optional()

});

export const updateInventorySchema =
    createInventorySchema.partial();

export const updateStockSchema = z.object({

    productId: z.coerce.number().int(),

    quantity: z.coerce.number().int().positive()

});