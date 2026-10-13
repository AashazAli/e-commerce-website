import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { asyncHandler } from "../../core/utils/asyncHandler";
import {
    createCategorySchema,
    updateCategorySchema
} from "./category.validation";

const service = new CategoryService();

export class CategoryController {

    create = asyncHandler(async (req: Request, res: Response) => {

        const category = await service.create(req.body);

        res.status(201).json({
            success: true,
            category
        });

    });

    getAll = asyncHandler(async (req: Request, res: Response) => {

        const categories = await service.getAll();

        res.json({
            success: true,
            categories
        });

    });

    getById = asyncHandler(async (req: Request, res: Response) => {

        const category = await service.getById(
            Number(req.params.id)
        );

        res.json({
            success: true,
            category
        });

    });

    update = asyncHandler(async (req: Request, res: Response) => {

        const category = await service.update(
            Number(req.params.id),
            req.body
        );

        res.json({
            success: true,
            category
        });

    });

    delete = asyncHandler(async (req: Request, res: Response) => {

        await service.delete(
            Number(req.params.id)
        );

        res.json({
            success: true,
            message: "Category deleted"
        });

    });

}