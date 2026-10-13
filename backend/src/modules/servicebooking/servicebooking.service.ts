import { AppError }
    from "../../core/errors/AppError";

import {
    CreateServiceBookingDTO
} from "./servicebooking.dto";

import {
    ServiceBookingRepository
} from "./servicebooking.repository";

import { prisma } from "../../lib/prisma";


const repository =
    new ServiceBookingRepository();


export class ServiceBookingService {


    async create(
    userId: number,
    data: CreateServiceBookingDTO
) {

    // ==========================================
    // 1. Check service exists
    // ==========================================

    const service =
        await prisma.service.findUnique({

            where: {
                id: data.serviceId
            }

        });


    if (!service) {

        throw new AppError(
            "Service not found",
            404
        );

    }


    // ==========================================
    // 2. Check service is active
    // ==========================================

    if (!service.isActive) {

        throw new AppError(
            "This service is currently unavailable",
            400
        );

    }


    // ==========================================
    // 3. Convert booking date
    // ==========================================

    const bookingDate =
        new Date(data.bookingDate);


    if (
        isNaN(
            bookingDate.getTime()
        )
    ) {

        throw new AppError(
            "Invalid booking date",
            400
        );

    }


    // ==========================================
    // 4. Don't allow past bookings
    // ==========================================

    if (
        bookingDate <= new Date()
    ) {

        throw new AppError(
            "Booking date must be in the future",
            400
        );

    }


    // ==========================================
    // 5. Calculate booking end time
    // ==========================================

    const endDate =
        new Date(
            bookingDate.getTime() +
            service.duration * 60 * 1000
        );


    // ==========================================
    // 6. Get bookings for that day
    // ==========================================

    const startOfDay =
        new Date(bookingDate);

    startOfDay.setHours(
        0,
        0,
        0,
        0
    );


    const endOfDay =
        new Date(bookingDate);

    endOfDay.setHours(
        23,
        59,
        59,
        999
    );


    const existingBookings =
        await repository.findBookingsForService(

            data.serviceId,

            startOfDay,

            endOfDay

        );


    // ==========================================
    // 7. Check for overlapping bookings
    // ==========================================

    const hasConflict =
        existingBookings.some(
            (existingBooking) => {

                const existingStart =
                    new Date(
                        existingBooking.bookingDate
                    );


                const existingEnd =
                    new Date(

                        existingStart.getTime() +

                        service.duration *
                        60 *
                        1000

                    );


                return (

                    bookingDate < existingEnd &&

                    endDate > existingStart

                );

            }
        );


    if (hasConflict) {

        throw new AppError(

            "This time slot is already booked. Please choose another time.",

            409

        );

    }


    // ==========================================
    // 8. Create booking
    // ==========================================

    return repository.create(

        userId,

        data

    );

}


    async getMyBookings(
        userId: number
    ) {

        return repository.findByUser(
            userId
        );

    }


    async getMyBooking(
        id: number,
        userId: number
    ) {

        const booking =
            await repository.findByUserAndId(
                id,
                userId
            );


        if (!booking) {

            throw new AppError(
                "Booking not found",
                404
            );

        }


        return booking;

    }


    async cancel(
        id: number,
        userId: number
    ) {

        const booking =
            await this.getMyBooking(
                id,
                userId
            );


        if (
            booking.status !== "PENDING" &&
            booking.status !== "CONFIRMED"
        ) {

            throw new AppError(
                "Booking cannot be cancelled at this stage",
                400
            );

        }


        return repository.updateStatus(
            id,
            "CANCELLED"
        );

    }


    async getAll() {

        return repository.findAll();

    }


    async getById(
        id: number
    ) {

        const booking =
            await repository.findById(id);


        if (!booking) {

            throw new AppError(
                "Booking not found",
                404
            );

        }


        return booking;

    }


    async updateStatus(
        id: number,
        status:
            "PENDING" |
            "CONFIRMED" |
            "COMPLETED" |
            "CANCELLED"
    ) {

        const booking =
            await this.getById(id);


        // Prevent invalid transitions

        switch (booking.status) {

            case "PENDING":

                if (
                    status !== "CONFIRMED" &&
                    status !== "CANCELLED"
                ) {

                    throw new AppError(
                        "Invalid booking status transition",
                        400
                    );

                }

                break;


            case "CONFIRMED":

                if (
                    status !== "COMPLETED" &&
                    status !== "CANCELLED"
                ) {

                    throw new AppError(
                        "Invalid booking status transition",
                        400
                    );

                }

                break;


            case "COMPLETED":

                throw new AppError(
                    "Completed booking cannot be changed",
                    400
                );


            case "CANCELLED":

                throw new AppError(
                    "Cancelled booking cannot be changed",
                    400
                );

        }


        return repository.updateStatus(
            id,
            status
        );

    }

}