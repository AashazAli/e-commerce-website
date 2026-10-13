import { Router } from "express";

import { CompatibilityController } from "./compatibility.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/admin.middleware";

import { validate } from "../../core/validation/validate";

import {
    createCompatibilitySchema,
    updateCompatibilitySchema
} from "./compatibility.validation";

const router = Router();

const controller = new CompatibilityController();

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
    controller.getByProduct
);

router.get(
    "/scooter-model/:scooterModelId",
    controller.getByScooterModel
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
    validate(createCompatibilitySchema),
    controller.create
);

router.put(
    "/:id",
    authenticate,
    adminOnly,
    validate(updateCompatibilitySchema),
    controller.update
);

router.delete(
    "/:id",
    authenticate,
    adminOnly,
    controller.delete
);

export default router;