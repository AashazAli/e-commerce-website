import { Router } from "express";

import { CartController } from "./cart.controller";

import { authenticate } from "../../middleware/auth.middleware";
import {
    addToCartSchema,
    updateQuantitySchema
} from "./cart.validation";
import { validate } from "../../core/validation/validate";

const router = Router();

const controller = new CartController();

router.get(

    "/",

    authenticate,

    controller.getCart

);
router.post(

    "/items",

    authenticate,

    validate(addToCartSchema),

    controller.addItem

);

router.patch(

    "/items/:productId",

    authenticate,

    validate(updateQuantitySchema),

    controller.updateQuantity

);

router.delete(

    "/items/:productId",

    authenticate,

    controller.removeItem

);

router.delete(

    "/clear",

    authenticate,

    controller.clearCart

);
export default router;