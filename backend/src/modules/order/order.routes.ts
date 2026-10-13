import { Router } from "express";

import { OrderController } from "./order.controller";

import { authenticate } from "../../middleware/auth.middleware";

import {
    createOrderSchema,
    updateOrderStatusSchema
} from "./order.validation";

import { validate } from "../../core/validation/validate";

const router = Router();

const controller = new OrderController();


// All order routes require authentication

router.use(authenticate);


// Create order

router.post(
    "/",
    validate(createOrderSchema),
    controller.create
);


// Get current user's orders

router.get(
    "/",
    controller.getAll
);


// Get one order

router.get(
    "/:id",
    controller.getById
);


// Update order status

router.patch(
    "/:id/cancel",
    controller.cancel
);


// Delete order

router.delete(
    "/:id",
    controller.delete
);


export default router;