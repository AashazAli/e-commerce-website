import { z } from "zod";


export const createServiceBookingSchema = z.object({

    serviceId: z
        .number()
        .int()
        .positive("Invalid service ID"),

    bookingDate: z
        .string()
        .datetime("Invalid booking date"),

    vehicleModel: z
        .string()
        .min(2, "Vehicle model is required")
        .max(100),

    notes: z
        .string()
        .max(1000)
        .optional()

});


export const updateBookingStatusSchema = z.object({

    status: z.enum([
        "PENDING",
        "CONFIRMED",
        "COMPLETED",
        "CANCELLED"
    ])

});