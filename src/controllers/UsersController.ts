import { Request, Response } from "express";

import { User } from "@prisma/client";
import { createHash } from "../lib/createHash";
import UsersServices from "../services/UsersServices";
import z from "zod";
import { generateAccessToken } from "../lib/auth";

const userRegisterDataSchema = z.object({
    id: z.string(),
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().optional()
});

export type UserRegisterData = z.infer<typeof userRegisterDataSchema>;

export default class UserController {
    private request: Request;
    private response: Response;

    constructor(req: Request, res: Response) {
        this.request = req;
        this.response = res;
    }

    async create() {
        const user: User = this.request.body
        if(user.email && user.name && user.password) {
            const hash = await createHash(user.password);
            user.password = hash;
            const access_token = generateAccessToken(user);
            const userInfo = await new UsersServices().create(user);
            const loginObjectResponse = {
                userInfo,
                authorization: {
                    access_token
                }
            }
            return this.response.json(loginObjectResponse);
        }
        throw new Error("Invalid user format.");
    }

    async getAll() {
        const users = await new UsersServices().getAll();
        return this.response.json(users);
    }

    async getById() {
        const id = this.request.params.id;
        const user = await new UsersServices().getById(id);
        const loginObjectResponse = {
            userInfo: {
                user
            }
        }
        return this.response.json(loginObjectResponse);
    }

    async update() {
        const user = this.request.body;
        const userUpdated = await new UsersServices().update(user);
        const loginObjectResponse = {
            userInfo: {
                id: userUpdated.id,
                name: userUpdated.name,
                email: userUpdated.email
            }
        }
        return this.response.json(loginObjectResponse);

    }

    async delete() {
        const id = this.request.params.id;
        const userDeleted = await new UsersServices().delete(id);
        const loginObjectResponse = {
            userInfo: {
                id: userDeleted.id,
                name: userDeleted.name,
                email: userDeleted.email
            }
        }
        return this.response.json(loginObjectResponse);
    }
}