import { Request, Response } from "express";
import { BrandService } from "./brand.service";
import { asyncHandler } from "../../core/utils/asyncHandler";

const service = new BrandService();

export class BrandController {

    create = asyncHandler(async (req: Request, res: Response) => {

        const brand = await service.create(req.body);

        res.status(201).json({
            success: true,
            brand
        });

    });

    getAll = asyncHandler(async (req: Request, res: Response) => {

        const brands = await service.getAll();

        res.json({
            success: true,
            brands
        });

    });

    getById = asyncHandler(async (req: Request, res: Response) => {

        const brand = await service.getById(Number(req.params.id));

        res.json({
            success: true,
            brand
        });

    });

    update = asyncHandler(async (req: Request, res: Response) => {

        const brand = await service.update(
            Number(req.params.id),
            req.body
        );

        res.json({
            success: true,
            brand
        });

    });

    delete = asyncHandler(async (req: Request, res: Response) => {

        await service.delete(Number(req.params.id));

        res.json({
            success: true,
            message: "Brand deleted"
        });

    });

}