import { Request, Response } from "express";
import { BrandService } from "./brand.service";

const service = new BrandService();

export class BrandController {

    async create(req: Request, res: Response) {

        try {

            const brand = await service.create(req.body);

            res.status(201).json({
                success: true,
                brand
            });

        } catch (err: any) {

            res.status(400).json({
                success: false,
                message: err.message
            });

        }

    }

    async getAll(req: Request, res: Response) {

        const brands = await service.getAll();

        res.json({
            success: true,
            brands
        });

    }

}