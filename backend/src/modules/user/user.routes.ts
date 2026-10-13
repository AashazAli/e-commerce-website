import { Router } from "express";

import { UserController } from "./user.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/admin.middleware";

const router = Router();

const controller = new UserController();

// Get Customers - Admin Only
router.get(
    "/",
    authenticate,
    adminOnly,
    controller.getCustomers
);

export default router;
