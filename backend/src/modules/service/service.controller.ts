import { Request, Response } from "express";

import { ServiceService }
    from "./service.service";

import { asyncHandler }
    from "../../core/utils/asyncHandler";


const service = new ServiceService();


export class ServiceController {


    create = asyncHandler(async (
        req: Request,
        res: Response
    ) => {

        const serviceData =
            await service.create(
                req.body
            );


        res.status(201).json({

            success: true,

            service: serviceData

        });

    });


    getAll = asyncHandler(async (
        req: Request,
        res: Response
    ) => {

        const services =
            await service.getAll();


        res.json({

            success: true,

            services

        });

    });


    getActive = asyncHandler(async (
        req: Request,
        res: Response
    ) => {

        const services =
            await service.getActive();


        res.json({

            success: true,

            services

        });

    });


    getById = asyncHandler(async (
        req: Request,
        res: Response
    ) => {

        const serviceData =
            await service.getById(
                Number(req.params.id)
            );


        res.json({

            success: true,

            service: serviceData

        });

    });


    update = asyncHandler(async (
        req: Request,
        res: Response
    ) => {

        const serviceData =
            await service.update(

                Number(req.params.id),

                req.body

            );


        res.json({

            success: true,

            service: serviceData

        });

    });


    delete = asyncHandler(async (
        req: Request,
        res: Response
    ) => {

        await service.delete(
            Number(req.params.id)
        );


        res.json({

            success: true,

            message: "Service deleted"

        });

    });

}