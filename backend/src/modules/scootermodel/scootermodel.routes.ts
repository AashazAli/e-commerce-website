import { Router } from "express";
import { ScooterModelController } from "./scootermodel.controller";;
import { authenticate } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/admin.middleware";

const router = Router();

const controller = new ScooterModelController();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post(
    "/",
    authenticate,
    adminOnly,
    controller.create
);

router.put(
    "/:id",
    authenticate,
    adminOnly,
    controller.update
);

router.delete(
    "/:id",
    authenticate,
    adminOnly,
    controller.delete
);

export default router;