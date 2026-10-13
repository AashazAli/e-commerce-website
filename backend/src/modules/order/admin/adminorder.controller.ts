import { Response } from "express";

import { asyncHandler } from "../../../core/utils/asyncHandler";

import { AuthRequest } from "../../../middleware/auth.middleware";

import { OrderService } from "../order.service";

const service = new OrderService();

export class AdminOrderController {


    getAll = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        const orders =
            await service.getAllOrders();

        res.json({

            success: true,

            orders

        });

    });


    getById = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        const order =
            await service.getOrderById(
                Number(req.params.id)
            );

        res.json({

            success: true,

            order

        });

    });


    updateStatus = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        const order =
            await service.updateOrderStatus(

                Number(req.params.id),

                req.body.status

            );

        res.json({

            success: true,

            message: "Order status updated",

            order

        });

    });

}