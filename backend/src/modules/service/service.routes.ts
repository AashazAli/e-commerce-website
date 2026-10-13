import { Router } from "express";

import { ServiceController }
    from "./service.controller";

import { authenticate }
    from "../../middleware/auth.middleware";

import { adminOnly }
    from "../../middleware/admin.middleware";

import {
    createServiceSchema,
    updateServiceSchema
} from "./service.validation";

import { validate }
    from "../../core/validation/validate";


const router = Router();

const controller =
    new ServiceController();


// Customer - view active services

router.get(
    "/",
    controller.getActive
);


// Customer/Admin - view one service

router.get(
    "/:id",
    controller.getById
);


// Admin routes

router.post(
    "/",
    authenticate,
    adminOnly,
    validate(createServiceSchema),
    controller.create
);


router.put(
    "/:id",
    authenticate,
    adminOnly,
    validate(updateServiceSchema),
    controller.update
);


router.delete(
    "/:id",
    authenticate,
    adminOnly,
    controller.delete
);


export default router;