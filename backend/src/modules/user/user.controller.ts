import { Request, Response } from "express";
import { UserService } from "./user.service";
import { asyncHandler } from "../../core/utils/asyncHandler";

const service = new UserService();

export class UserController {

    getCustomers = asyncHandler(async (req: Request, res: Response) => {

        const users = await service.getCustomers();

        res.json({
            success: true,
            users
        });

    });

}
