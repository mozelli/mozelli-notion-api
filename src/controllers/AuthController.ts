import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";
import { generateAccessToken } from "../lib/auth";
import { User } from "@prisma/client";
import z from "zod";

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type Credentials = z.infer<typeof credentialsSchema>;

export default class AuthController {
    private request: Request;
    private response: Response;

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

    async login() {
        let credentials: Credentials = this.request.body;
        if(credentials.email && credentials.password) {
            const user: User | false = await new AuthServices().login(credentials, this.response);
            if(user) {
                const auth = generateAccessToken(user);
                const loginObjectResponse = {
                    userInfo: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    },
                    userAuthentication: {
                        access_token: auth
                    }
                }
                
                return this.response.json(loginObjectResponse);
            } else {
                return this.response.status(400).json({message: "Credenciais inválidas."});
            }
        } else {
            return this.response.status(400).json({message: "Credenciais não informadas."});
        }
    }

    // async getAll() {
    //     const users = await new UsersServices().getAll();
    //     return this.response.json(users);
    // }

    // async getById() {
    //     const id = this.request.params.id;
    //     const user = await new UsersServices().getById(id);
    //     return this.response.json(user);
    // }

    // async update() {
    //     const user = this.request.body;
    //     const userUpdated = await new UsersServices().update(user);
    //     return this.response.json(userUpdated);

    // }

    // async delete() {
    //     const id = this.request.params.id;
    //     const result = await new UsersServices().delete(id);
    //     return this.response.json(result);
    // }
}