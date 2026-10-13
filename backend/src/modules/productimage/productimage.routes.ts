import { Router } from "express";

import { ProductImageController } from "./productimage.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/admin.middleware";

import { validate } from "../../core/validation/validate";

import {
    createProductImageSchema,
    updateProductImageSchema
} from "./productimage.validation";

const router = Router();

const controller = new ProductImageController();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get all images
router.get(
    "/",
    controller.getAll
);

// Get image by ID
router.get(
    "/:id",
    controller.getById
);

// Get all images of a product
router.get(
    "/product/:productId",
    controller.getByProductId
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Create image
router.post(
    "/",
    authenticate,
    adminOnly,
    validate(createProductImageSchema),
    controller.create
);

// Update image
router.put(
    "/:id",
    authenticate,
    adminOnly,
    validate(updateProductImageSchema),
    controller.update
);

// Delete image
router.delete(
    "/:id",
    authenticate,
    adminOnly,
    controller.delete
);

export default router;