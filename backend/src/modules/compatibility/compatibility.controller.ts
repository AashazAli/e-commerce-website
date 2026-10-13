import { Request, Response } from "express";

import { asyncHandler } from "../../core/utils/asyncHandler";

import { CompatibilityService } from "./compatibility.service";

const service = new CompatibilityService();

export class CompatibilityController {

    create = asyncHandler(async (req: Request, res: Response) => {

        const compatibility = await service.create(req.body);

        res.status(201).json({
            success: true,
            compatibility
        });

    });

    getAll = asyncHandler(async (req: Request, res: Response) => {

        const compatibilities = await service.getAll();

        res.json({
            success: true,
            compatibilities
        });

    });

    getById = asyncHandler(async (req: Request, res: Response) => {

        const compatibility = await service.getById(
            Number(req.params.id)
        );

        res.json({
            success: true,
            compatibility
        });

    });

    getByProduct = asyncHandler(async (req: Request, res: Response) => {

        const compatibilities =
            await service.getByProduct(
                Number(req.params.productId)
            );

        res.json({
            success: true,
            compatibilities
        });

    });

    getByScooterModel = asyncHandler(async (req: Request, res: Response) => {

        const compatibilities =
            await service.getByScooterModel(
                Number(req.params.scooterModelId)
            );

        res.json({
            success: true,
            compatibilities
        });

    });

    update = asyncHandler(async (req: Request, res: Response) => {

        const compatibility =
            await service.update(
                Number(req.params.id),
                req.body
            );

        res.json({
            success: true,
            compatibility
        });

    });

    delete = asyncHandler(async (req: Request, res: Response) => {

        await service.delete(
            Number(req.params.id)
        );

        res.json({
            success: true,
            message: "Compatibility deleted successfully"
        });

    });

}