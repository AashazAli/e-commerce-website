import { Request, Response } from "express";

import { ScooterModelService } from "./scootermodel.service";

import {
    createScooterModelSchema,
    updateScooterModelSchema
} from "./scootermodel.validation";

const service = new ScooterModelService();

export class ScooterModelController {

    async create(req: Request, res: Response) {

        try {

            const data = createScooterModelSchema.parse(req.body);

            const scooterModel = await service.create(data);

            return res.status(201).json({
                success: true,
                message: "Scooter model created successfully",
                scooterModel
            });

        } catch (error: any) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    async getAll(req: Request, res: Response) {

        try {

            const scooterModels = await service.getAll();

            return res.status(200).json({
                success: true,
                scooterModels
            });

        } catch (error: any) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    async getById(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const scooterModel = await service.getById(id);

            if (!scooterModel) {

                return res.status(404).json({
                    success: false,
                    message: "Scooter model not found"
                });

            }

            return res.status(200).json({
                success: true,
                scooterModel
            });

        } catch (error: any) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    async update(req: Request, res: Response) {

        try {

            const id = Number(req.params.id);

            const data = updateScooterModelSchema.parse(req.body);

            const scooterModel = await service.update(id, data);

            return res.status(200).json({
                success: true,
                message: "Scooter model updated successfully",
                scooterModel
            });

        } catch (error: any) {

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
                message: "Scooter model deleted successfully"
            });

        } catch (error: any) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}