import { Router } from "express";

import { AdminOrderController }
    from "./adminorder.controller";

import { authenticate }
    from "../../../middleware/auth.middleware";

import { adminOnly }
    from "../../../middleware/admin.middleware";

const router = Router();

const controller =
    new AdminOrderController();


router.use(authenticate);

router.use(adminOnly);


// Get all orders

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
    "/:id/status",
    controller.updateStatus
);


export default router;