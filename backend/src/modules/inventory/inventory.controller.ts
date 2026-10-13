import { Request, Response } from "express";

import { asyncHandler } from "../../core/utils/asyncHandler";

import { InventoryService } from "./inventory.service";

const service = new InventoryService();

export class InventoryController {

    create = asyncHandler(async (req: Request, res: Response) => {

        const inventory = await service.create(req.body);

        res.status(201).json({
            success: true,
            inventory
        });

    });

    getAll = asyncHandler(async (req: Request, res: Response) => {

        const inventory = await service.getAll();

        res.json({
            success: true,
            inventory
        });

    });

    getById = asyncHandler(async (req: Request, res: Response) => {

        const inventory = await service.getById(
            Number(req.params.id)
        );

        res.json({
            success: true,
            inventory
        });

    });

    getByProductId = asyncHandler(async (req: Request, res: Response) => {

        const inventory = await service.getByProductId(
            Number(req.params.productId)
        );

        res.json({
            success: true,
            inventory
        });

    });

    update = asyncHandler(async (req: Request, res: Response) => {

        const inventory = await service.update(
            Number(req.params.id),
            req.body
        );

        res.json({
            success: true,
            inventory
        });

    });

    delete = asyncHandler(async (req: Request, res: Response) => {

        await service.delete(Number(req.params.id));

        res.json({
            success: true,
            message: "Inventory deleted"
        });

    });

    addStock = asyncHandler(async (req: Request, res: Response) => {

        const { productId, quantity } = req.body;

        const inventory = await service.addStock(
            productId,
            quantity
        );

        res.json({
            success: true,
            message: "Stock added successfully",
            inventory
        });

    });

    removeStock = asyncHandler(async (req: Request, res: Response) => {

        const { productId, quantity } = req.body;

        const inventory = await service.removeStock(
            productId,
            quantity
        );

        res.json({
            success: true,
            message: "Stock removed successfully",
            inventory
        });

    });

    getLowStock = asyncHandler(async (req: Request, res: Response) => {

        const inventory = await service.getLowStock();

        res.json({
            success: true,
            inventory
        });

    });

}