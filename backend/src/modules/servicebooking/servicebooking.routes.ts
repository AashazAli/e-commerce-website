import { Router } from "express";

import {
    ServiceBookingController
} from "./servicebooking.controller";

import { authenticate }
    from "../../middleware/auth.middleware";

import { adminOnly }
    from "../../middleware/admin.middleware";

import {
    createServiceBookingSchema,
    updateBookingStatusSchema
} from "./servicebooking.validation";

import { validate }
    from "../../core/validation/validate";


const router = Router();

const controller =
    new ServiceBookingController();


// All booking routes require authentication

router.use(authenticate);


// ==========================================
// CUSTOMER ROUTES
// ==========================================

// Create booking

router.post(
    "/",
    validate(createServiceBookingSchema),
    controller.create
);


// Get my bookings

router.get(
    "/",
    controller.getMyBookings
);


// ==========================================
// ADMIN ROUTES
// IMPORTANT: These come BEFORE /:id
// ==========================================

// Get all bookings

router.get(
    "/admin/all",
    adminOnly,
    controller.adminGetAll
);


// Get booking by ID

router.get(
    "/admin/:id",
    adminOnly,
    controller.adminGetById
);


// Update booking status

router.patch(
    "/admin/:id/status",
    adminOnly,
    validate(updateBookingStatusSchema),
    controller.adminUpdateStatus
);


// ==========================================
// CUSTOMER SINGLE BOOKING ROUTES
// ==========================================

// Get my booking by ID

router.get(
    "/:id",
    controller.getMyBooking
);


// Cancel my booking

router.patch(
    "/:id/cancel",
    controller.cancel
);


// ==========================================
// EXPORT
// ==========================================

export default router;