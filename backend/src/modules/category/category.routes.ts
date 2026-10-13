import { Router } from "express";
import { CategoryController } from "./category.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/admin.middleware";
import { validate } from "../../core/validation/validate";

import {
    createCategorySchema,
    updateCategorySchema
} from "./category.validation";

const router = Router();

const controller = new CategoryController();

// Create Category
router.post(
    "/",
    authenticate,
    adminOnly,
    validate(createCategorySchema),
    controller.create
);

// Get All Categories
router.get(
    "/",
    controller.getAll
);

// Get Category By ID
router.get(
    "/:id",
    controller.getById
);

// Update Category
router.put(
    "/:id",
    authenticate,
    adminOnly,
    validate(updateCategorySchema),
    controller.update
);

// Delete Category
router.delete(
    "/:id",
    authenticate,
    adminOnly,
    controller.delete
);

export default router;