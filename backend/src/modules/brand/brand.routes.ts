import { Router } from "express";

import { BrandController } from "./brand.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/admin.middleware";

import { validate } from "../../core/validation/validate";

import {
    createBrandSchema,
    updateBrandSchema
} from "./brand.validation";

const router = Router();

const controller = new BrandController();

// Create Brand
router.post(
    "/",
    authenticate,
    adminOnly,
    validate(createBrandSchema),
    controller.create
);

// Get All Brands
router.get(
    "/",
    controller.getAll
);

// Get Brand By ID
router.get(
    "/:id",
    controller.getById
);

// Update Brand
router.put(
    "/:id",
    authenticate,
    adminOnly,
    validate(updateBrandSchema),
    controller.update
);

// Delete Brand
router.delete(
    "/:id",
    authenticate,
    adminOnly,
    controller.delete
);

export default router;