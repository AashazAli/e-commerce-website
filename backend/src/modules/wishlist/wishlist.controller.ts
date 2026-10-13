import { Response } from "express";

import { WishlistService } from "./wishlist.service";

import { asyncHandler } from "../../core/utils/asyncHandler";

import { AuthRequest } from "../../middleware/auth.middleware";

const service = new WishlistService();

export class WishlistController {

    getWishlist = asyncHandler(async (req: AuthRequest, res: Response) => {

        const wishlist = await service.getWishlist(

            req.user!.id

        );

        res.json({

            success: true,

            wishlist

        });

    });

    add = asyncHandler(async (req: AuthRequest, res: Response) => {

        const wishlist = await service.add(

            req.user!.id,

            req.body.productId

        );

        res.status(201).json({

            success: true,

            wishlist

        });

    });

    remove = asyncHandler(async (req: AuthRequest, res: Response) => {

        await service.remove(

            req.user!.id,

            Number(req.params.productId)

        );

        res.json({

            success: true,

            message: "Product removed from wishlist"

        });

    });

}