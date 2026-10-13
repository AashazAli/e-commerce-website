import { z } from "zod";

export const createAddressSchema = z.object({

    fullName: z.string().min(2),

    phone: z.string().min(10).max(15),

    addressLine: z.string().min(5),

    city: z.string().min(2),

    state: z.string().min(2),

    pincode: z.string().min(4).max(10),

    isDefault: z.boolean().optional()

});

export const updateAddressSchema = createAddressSchema.partial();