import { Router } from "express";
import { ScooterModelController } from "./scootermodel.controller";;
import { authenticate } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/admin.middleware";
import { validate } from "../../core/validation/validate";
import {
    createScooterModelSchema,
    updateScooterModelSchema
} from "./scootermodel.validation";
const router = Router();

const controller = new ScooterModelController();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.get(
    "/",
    controller.getAll
);

router.post(
    "/",
    authenticate,
    adminOnly,
    validate(createScooterModelSchema),
    controller.create
);

// Get All Categories
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
    validate(updateScooterModelSchema),
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