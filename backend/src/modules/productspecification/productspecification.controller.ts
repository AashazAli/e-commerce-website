import { Request, Response } from "express";

import { asyncHandler } from "../../core/utils/asyncHandler";

import { ProductSpecificationService } from "./productspecification.service";

const service = new ProductSpecificationService();

export class ProductSpecificationController {

    create = asyncHandler(async (req: Request, res: Response) => {

        const specification = await service.create(req.body);

        res.status(201).json({
            success: true,
            specification
        });

    });

    getAll = asyncHandler(async (req: Request, res: Response) => {

        const specifications = await service.getAll();

        res.json({
            success: true,
            specifications
        });

    });

    getById = asyncHandler(async (req: Request, res: Response) => {

        const specification = await service.getById(
            Number(req.params.id)
        );

        res.json({
            success: true,
            specification
        });

    });

    getByProductId = asyncHandler(async (req: Request, res: Response) => {

        const specifications =
            await service.getByProductId(
                Number(req.params.productId)
            );

        res.json({
            success: true,
            specifications
        });

    });

    update = asyncHandler(async (req: Request, res: Response) => {

        const specification =
            await service.update(
                Number(req.params.id),
                req.body
            );

        res.json({
            success: true,
            specification
        });

    });

    delete = asyncHandler(async (req: Request, res: Response) => {

        await service.delete(
            Number(req.params.id)
        );

        res.json({
            success: true,
            message: "Specification deleted successfully"
        });

    });

}