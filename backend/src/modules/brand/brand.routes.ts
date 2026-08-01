import { Router } from "express";

import { BrandController } from "./brand.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/admin.middleware";

const router = Router();

const controller = new BrandController();

router.post(
    "/",
    authenticate,
    adminOnly,
    controller.create
);

router.get(
    "/",
    controller.getAll
);

export default router;