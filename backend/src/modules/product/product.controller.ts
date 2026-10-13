import { Request, Response } from "express";

import { ProductService } from "./product.service";
import { asyncHandler } from "../../core/utils/asyncHandler";

const service = new ProductService();

export class ProductController {

    // Create Product
    create = asyncHandler(async (req: Request, res: Response) => {

        const product = await service.create(req.body);

        res.status(201).json({
            success: true,
            product
        });

    });


    // Get All Products
    getAll = asyncHandler(async (req: Request, res: Response) => {

        const products = await service.getAll();

        res.json({
            success: true,
            products
        });

    });


    // Get Product By ID
    getById = asyncHandler(async (req: Request, res: Response) => {

        const product = await service.getById(
            Number(req.params.id)
        );

        res.json({
            success: true,
            product
        });

    });


    // Update Product
    update = asyncHandler(async (req: Request, res: Response) => {

        const product = await service.update(
            Number(req.params.id),
            req.body
        );

        res.json({
            success: true,
            product
        });

    });


    // Delete Product
    delete = asyncHandler(async (req: Request, res: Response) => {

        await service.delete(
            Number(req.params.id)
        );

        res.json({
            success: true,
            message: "Product deleted"
        });

    });

}