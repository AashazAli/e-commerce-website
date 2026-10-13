import { Router } from "express";

import { ProductSpecificationController } from "./productspecification.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/admin.middleware";

import { validate } from "../../core/validation/validate";

import {
    createProductSpecificationSchema,
    updateProductSpecificationSchema
} from "./productspecification.validation";

const router = Router();

const controller = new ProductSpecificationController();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    controller.getAll
);

router.get(
    "/:id",
    controller.getById
);

router.get(
    "/product/:productId",
    controller.getByProductId
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authenticate,
    adminOnly,
    validate(createProductSpecificationSchema),
    controller.create
);

router.put(
    "/:id",
    authenticate,
    adminOnly,
    validate(updateProductSpecificationSchema),
    controller.update
);

router.delete(
    "/:id",
    authenticate,
    adminOnly,
    controller.delete
);

export default router;