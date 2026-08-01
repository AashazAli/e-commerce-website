import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import {
    createCategorySchema,
    updateCategorySchema
} from "./category.validation";

const service = new CategoryService();

export class CategoryController {

    async create(req: Request, res: Response) {
        try {

            const data = createCategorySchema.parse(req.body);

            const category = await service.create(data);

            res.status(201).json({
                success: true,
                category
            });

        } catch (err: any) {

            res.status(400).json({
                success: false,
                message: err.message
            });

        }
    }

    async getAll(req: Request, res: Response) {

        const categories = await service.getAll();

        res.json({
            success: true,
            categories
        });

    }

    async getById(req: Request, res: Response) {

        const category = await service.getById(Number(req.params.id));

        res.json({
            success: true,
            category
        });

    }

    async update(req: Request, res: Response) {

        try {

            const data = updateCategorySchema.parse(req.body);

            const category = await service.update(
                Number(req.params.id),
                data
            );

            res.json({
                success: true,
                category
            });

        } catch (err: any) {

            res.status(400).json({
                success: false,
                message: err.message
            });

        }

    }

    async delete(req: Request, res: Response) {

        await service.delete(Number(req.params.id));

        res.json({
            success: true,
            message: "Category deleted"
        });

    }

}