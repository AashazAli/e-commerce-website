import { Request, Response } from "express";

import { ProductService } from "./product.service";

import {
    CreateProductDTO,
    UpdateProductDTO
} from "./product.dto";

const service = new ProductService();

export class ProductController {

    async create(req: Request, res: Response) {

        try {

            const data: CreateProductDTO = req.body;

            const product = await service.create(data);

            return res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product
            });

        } catch (error: any) {

            console.error(error);

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    async getAll(req: Request, res: Response) {

        try {

            const products = await service.getAll();

            return res.status(200).json({
                success: true,
                count: products.length,
                data: products
            });

        } catch (error: any) {

            console.error(error);

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    async getById(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const product = await service.getById(id);

            if (!product) {

                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });

            }

            return res.status(200).json({
                success: true,
                data: product
            });

        } catch (error: any) {

            console.error(error);

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    async update(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const data: UpdateProductDTO = req.body;

            const product = await service.update(id, data);

            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: product
            });

        } catch (error: any) {

            console.error(error);

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    async delete(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            await service.delete(id);

            return res.status(200).json({
                success: true,
                message: "Product deleted successfully"
            });

        } catch (error: any) {

            console.error(error);

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}