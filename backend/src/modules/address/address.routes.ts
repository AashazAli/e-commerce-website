import { Router } from "express";

import { AddressController } from "./address.controller";

import { authenticate } from "../../middleware/auth.middleware";

import { validate } from "../../core/validation/validate";

import {

    createAddressSchema,

    updateAddressSchema

} from "./address.validation";

const router = Router();

const controller = new AddressController();

router.use(authenticate);

router.post(

    "/",

    validate(createAddressSchema),

    controller.create

);

router.get(

    "/",

    controller.getAll

);

router.get(

    "/:id",

    controller.getById

);

router.put(

    "/:id",

    validate(updateAddressSchema),

    controller.update

);

router.delete(

    "/:id",

    controller.delete

);

router.patch(

    "/:id/default",

    controller.setDefault

);

export default router;