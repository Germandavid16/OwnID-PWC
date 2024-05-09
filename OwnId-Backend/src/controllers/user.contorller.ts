import { Request, Response } from "express";
import {AppDataSource} from "../data-source";
import {User} from "../entity/user.entity";

export class UserController {
    static async signup(req: Request, res: Response) {
        const { email, ownIdData } = req.body;
        const user = new User();
        user.email = email;
        user.ownIdData = ownIdData;

        const userRepository = AppDataSource.getRepository(User);
        await userRepository.save(user);

        return res
            .status(200)
            .json({ message: "User created successfully", user });
    }

    static async getUserByEmail(email: string) {
        const userRepository = AppDataSource.getRepository(User);
        return await userRepository.findOne({where: {email: email}});
    }
}
