import { Response } from "express";

import { AddressService } from "./address.service";

import { asyncHandler } from "../../core/utils/asyncHandler";

import { AuthRequest } from "../../middleware/auth.middleware";

const service = new AddressService();

export class AddressController {

    create = asyncHandler(async (req: AuthRequest, res: Response) => {

        const address = await service.createAddress(

            req.user!.id,

            req.body

        );

        res.status(201).json({

            success: true,

            address

        });

    });

    getAll = asyncHandler(async (req: AuthRequest, res: Response) => {

        const addresses = await service.getUserAddresses(

            req.user!.id

        );

        res.json({

            success: true,

            addresses

        });

    });

    getById = asyncHandler(async (req: AuthRequest, res: Response) => {

        const address = await service.getUserAddress(

            Number(req.params.id),

            req.user!.id

        );

        res.json({

            success: true,

            address

        });

    });

    update = asyncHandler(async (req: AuthRequest, res: Response) => {

        const address = await service.updateAddress(

            Number(req.params.id),

            req.user!.id,

            req.body

        );

        res.json({

            success: true,

            address

        });

    });

    delete = asyncHandler(async (req: AuthRequest, res: Response) => {

        await service.deleteAddress(

            Number(req.params.id),

            req.user!.id

        );

        res.json({

            success: true,

            message: "Address deleted"

        });

    });

    setDefault = asyncHandler(async (req: AuthRequest, res: Response) => {

        const address = await service.setDefault(

            Number(req.params.id),

            req.user!.id

        );

        res.json({

            success: true,

            address

        });

    });

}