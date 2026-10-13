import { Router } from "express";

import { WishlistController } from "./wishlist.controller";

import { authenticate } from "../../middleware/auth.middleware";

import { validate } from "../../core/validation/validate";

import {

    createWishlistSchema

} from "./wishlist.validation";

const router = Router();

const controller = new WishlistController();

router.use(authenticate);

router.get(

    "/",

    controller.getWishlist

);

router.post(

    "/",

    validate(createWishlistSchema),

    controller.add

);

router.delete(

    "/:productId",

    controller.remove

);

export default router;