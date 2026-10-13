import { prisma } from "../../lib/prisma";

import {
    CreateServiceBookingDTO
} from "./servicebooking.dto";


export class ServiceBookingRepository {


    async create(
        userId: number,
        data: CreateServiceBookingDTO
    ) {

        return prisma.serviceBooking.create({

            data: {

                userId,

                serviceId: data.serviceId,

                bookingDate:
                    new Date(data.bookingDate),

                vehicleModel:
                    data.vehicleModel,

                notes:
                    data.notes

            },

            include: {

                service: true

            }

        });

    }


    async findByUser(
        userId: number
    ) {

        return prisma.serviceBooking.findMany({

            where: {
                userId
            },

            include: {

                service: true

            },

            orderBy: {

                createdAt: "desc"

            }

        });

    }


    async findById(
        id: number
    ) {

        return prisma.serviceBooking.findUnique({

            where: {
                id
            },

            include: {

                service: true,

                user: true

            }

        });

    }


    async findByUserAndId(
        id: number,
        userId: number
    ) {

        return prisma.serviceBooking.findFirst({

            where: {

                id,

                userId

            },

            include: {

                service: true

            }

        });

    }


    async findAll() {

        return prisma.serviceBooking.findMany({

            include: {

                service: true,

                user: true

            },

            orderBy: {

                createdAt: "desc"

            }

        });

    }


    async updateStatus(
        id: number,
        status:
            "PENDING" |
            "CONFIRMED" |
            "COMPLETED" |
            "CANCELLED"
    ) {

        return prisma.serviceBooking.update({

            where: {
                id
            },

            data: {
                status
            },

            include: {

                service: true,

                user: true

            }

        });

    }

    async findBookingsForService(
    serviceId: number,
    startOfDay: Date,
    endOfDay: Date
) {

    return prisma.serviceBooking.findMany({

        where: {

            serviceId,

            status: {
                in: [
                    "PENDING",
                    "CONFIRMED"
                ]
            },

            bookingDate: {
                gte: startOfDay,
                lt: endOfDay
            }

        },

        include: {

            service: true

        }

    });

}

}