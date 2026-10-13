import { Response } from "express";

import { OrderService } from "./order.service";

import { asyncHandler } from "../../core/utils/asyncHandler";

import { AuthRequest } from "../../middleware/auth.middleware";

import {
    CreateOrderDTO,
    UpdateOrderStatusDTO
} from "./order.dto";

const service = new OrderService();

export class OrderController {

    create = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        const order = await service.createOrder(
            req.user!.id,
            req.body as CreateOrderDTO
        );

        res.status(201).json({
            success: true,
            order
        });

    });


    getAll = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        const orders = await service.getMyOrders(
            req.user!.id
        );

        res.json({
            success: true,
            orders
        });

    });


    getById = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        const order = await service.getMyOrder(
            Number(req.params.id),
            req.user!.id
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

        const order = await service.updateOrderStatus(
            Number(req.params.id),
            (req.body as UpdateOrderStatusDTO).status
        );

        res.json({
            success: true,
            order
        });

    });


    delete = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        await service.deleteOrder(
            Number(req.params.id)
        );

        res.json({
            success: true,
            message: "Order deleted"
        });

    });

    cancel = asyncHandler(async (
    req: AuthRequest,
    res: Response
) => {

    const order = await service.cancelOrder(

        Number(req.params.id),

        req.user!.id

    );

    res.json({

        success: true,

        message: "Order cancelled successfully",

        order

    });

});

}