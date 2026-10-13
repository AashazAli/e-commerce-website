import { Response } from "express";

import { asyncHandler } from "../../core/utils/asyncHandler";

import { AuthRequest } from "../../middleware/auth.middleware";

import { CartService } from "./cart.service";

const service = new CartService();

export class CartController {

    getCart = asyncHandler(

        async (

            req: AuthRequest,

            res: Response

        ) => {

            const cart = await service.getCart(

                req.user!.id

            );

            res.json({

                success: true,

                cart

            });

        }

    );
    addItem = asyncHandler(

    async (

        req: AuthRequest,

        res: Response

    ) => {

        const cart =
            await service.addItem(

                req.user!.id,

                req.body.productId,

                req.body.quantity

            );

        res.status(201).json({

            success: true,

            cart

        });

    }

);

updateQuantity = asyncHandler(

    async (

        req: AuthRequest,

        res: Response

    ) => {

        const cart =
            await service.updateQuantity(

                req.user!.id,

                Number(req.params.productId),

                req.body.quantity

            );

        res.json({

            success: true,

            cart

        });

    }

);

removeItem = asyncHandler(

    async (

        req: AuthRequest,

        res: Response

    ) => {

        const cart =
            await service.removeItem(

                req.user!.id,

                Number(req.params.productId)

            );

        res.json({

            success:true,

            cart

        });

    }

);

clearCart = asyncHandler(

    async (

        req: AuthRequest,

        res: Response

    ) => {

        const cart =
            await service.clearCart(

                req.user!.id

            );

        res.json({

            success: true,

            cart

        });

    }

);

}