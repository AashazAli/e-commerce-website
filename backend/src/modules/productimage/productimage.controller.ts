import { Request, Response } from "express";

import { asyncHandler } from "../../core/utils/asyncHandler";

import { ProductImageService } from "./productimage.service";

const service = new ProductImageService();

export class ProductImageController {

    create = asyncHandler(async (req: Request, res: Response) => {

        const image = await service.create(req.body);

        res.status(201).json({
            success: true,
            image
        });

    });

    getAll = asyncHandler(async (req: Request, res: Response) => {

        const images = await service.getAll();

        res.json({
            success: true,
            images
        });

    });

    getById = asyncHandler(async (req: Request, res: Response) => {

        const image = await service.getById(
            Number(req.params.id)
        );

        res.json({
            success: true,
            image
        });

    });

    getByProductId = asyncHandler(async (req: Request, res: Response) => {

        const images = await service.getByProductId(
            Number(req.params.productId)
        );

        res.json({
            success: true,
            images
        });

    });

    update = asyncHandler(async (req: Request, res: Response) => {

        const image = await service.update(
            Number(req.params.id),
            req.body
        );

        res.json({
            success: true,
            image
        });

    });

    delete = asyncHandler(async (req: Request, res: Response) => {

        await service.delete(
            Number(req.params.id)
        );

        res.json({
            success: true,
            message: "Product image deleted successfully"
        });

    });

}