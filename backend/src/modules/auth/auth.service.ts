import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../core/errors/AppError";

import { AuthRepository } from "./auth.repository";

const repository = new AuthRepository();

export class AuthService {

    async register(data: any) {

        const exists = await repository.findUserByEmail(data.email);

        if (exists) {
            throw new AppError(
                "Email already exists",
                409
            );
}

        const password = await bcrypt.hash(data.password, 10);

        return repository.createUser({
            ...data,
            password,
            role: "CUSTOMER"
        });


    }

    async login(email: string, password: string) {

    const user = await repository.findByEmail(email);

    if (!user) {
    throw new AppError(
        "Invalid email or password",
        401
    );
}

    const valid = await bcrypt.compare(
        password,
        user.password
    );

    if (!valid)
        throw new AppError(
            "Invalid email or password",
            401
        );

    const token = jwt.sign(

        {
            id: user.id,
            role: user.role
        },

        process.env.JWT_SECRET!,

        {
            expiresIn: "7d"
        }

    );

    return {

        token,

        user

    };

}

}