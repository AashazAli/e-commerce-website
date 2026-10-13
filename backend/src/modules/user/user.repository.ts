import { prisma } from "../../lib/prisma";

export class UserRepository {

    async findCustomers() {

        return prisma.user.findMany({

            where: {
                role: "CUSTOMER"
            },

            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                profileImage: true,
                role: true,
                isActive: true,
                createdAt: true
            },

            orderBy: {
                createdAt: "desc"
            }

        });

    }

}
