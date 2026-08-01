import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AuthRepository } from "./auth.repository";

const repository = new AuthRepository();

export class AuthService {

    async register(data: any) {

        const exists = await repository.findUserByEmail(data.email);

        if (exists)
            throw new Error("Email already exists");

        const password = await bcrypt.hash(data.password, 10);

        return repository.createUser({
            ...data,
            password,
            role: "CUSTOMER"
        });


    }

    async login(email: string, password: string) {

    const user = await repository.findByEmail(email);

    if (!user)
        throw new Error("Invalid email or password");

    const valid = await bcrypt.compare(
        password,
        user.password
    );

    if (!valid)
        throw new Error("Invalid email or password");

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