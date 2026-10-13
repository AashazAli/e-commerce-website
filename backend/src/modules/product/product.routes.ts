import { Router } from "express";

import { ProductController } from "./product.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/admin.middleware";
import { validate } from "../../core/validation/validate";

import {
    createProductSchema,
    updateProductSchema
} from "./product.validation";

const router = Router();

const controller = new ProductController();

// Public
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

// Admin
router.post(
    "/",
    authenticate,
    adminOnly,
    validate(createProductSchema),
    controller.create
);

router.put(
    "/:id",
    authenticate,
    adminOnly,
    validate(updateProductSchema),
    controller.update
);

router.delete(
    "/:id",
    authenticate,
    adminOnly,
    controller.delete
);

export default router;