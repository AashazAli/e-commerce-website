import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: {
        id: number;
        role: string;
    };
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    const token = authHeader.replace("Bearer ", "");

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as any;

        req.user = decoded;

        next();

    } catch {

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });

    }

};