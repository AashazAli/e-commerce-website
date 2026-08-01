import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const service = new AuthService();

export class AuthController {

    async register(req: Request, res: Response) {

        try {

            const user = await service.register(req.body);

            const { password, ...safeUser } = user;

            res.status(201).json({
                success: true,
                message: "Registration successful",
                user: safeUser,
            });

        } catch (err: any) {

            res.status(400).json({
                success: false,
                message: err.message
            });

        }

    }

    async login(req: Request, res: Response) {

    try {

        const { email, password } = req.body;

        const data = await service.login(

            email,

            password

        );

        const { password: _, ...safeUser } = data.user;

        res.json({

            success: true,

            token: data.token,

            user: safeUser

        });

    }

    catch (err: any) {

        res.status(401).json({

            success: false,

            message: err.message

        });

    }

}

async me(req: any, res: Response) {

    res.json({

        success: true,

        user: req.user

    });

}

}