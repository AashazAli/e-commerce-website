import { Response } from "express";

import { asyncHandler }
    from "../../core/utils/asyncHandler";

import { AuthRequest }
    from "../../middleware/auth.middleware";

import {
    ServiceBookingService
} from "./servicebooking.service";


const service =
    new ServiceBookingService();


export class ServiceBookingController {


    create = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        const booking =
            await service.create(

                req.user!.id,

                req.body

            );


        res.status(201).json({

            success: true,

            message: "Service booked successfully",

            booking

        });

    });


    getMyBookings = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        const bookings =
            await service.getMyBookings(
                req.user!.id
            );


        res.json({

            success: true,

            bookings

        });

    });


    getMyBooking = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        const booking =
            await service.getMyBooking(

                Number(req.params.id),

                req.user!.id

            );


        res.json({

            success: true,

            booking

        });

    });


    cancel = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        const booking =
            await service.cancel(

                Number(req.params.id),

                req.user!.id

            );


        res.json({

            success: true,

            message: "Service booking cancelled",

            booking

        });

    });


    adminGetAll = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        const bookings =
            await service.getAll();


        res.json({

            success: true,

            bookings

        });

    });


    adminGetById = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        const booking =
            await service.getById(
                Number(req.params.id)
            );


        res.json({

            success: true,

            booking

        });

    });


    adminUpdateStatus = asyncHandler(async (
        req: AuthRequest,
        res: Response
    ) => {

        const booking =
            await service.updateStatus(

                Number(req.params.id),

                req.body.status

            );


        res.json({

            success: true,

            message: "Booking status updated",

            booking

        });

    });

}