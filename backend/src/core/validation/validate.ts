import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validate = (
    schema: ZodType
) => {

    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            req.body = await schema.parseAsync(req.body);

            next();

        } catch (error: any) {

            return res.status(400).json({
                success: false,
                message: error.issues ?? error.message
            });

        }

    };

};