import { User } from "@prisma/client";
import { Response } from "express";
import prismaClient from "../prisma";
import { compareSync } from 'bcryptjs';

import { Credentials } from "../controllers/AuthController";

export default class AuthServices {

    constructor() {
    } 

    async login(credenitials: Credentials, response: Response) {
        try {
            const userExist: User | null = await prismaClient.user.findUnique({
                where: {
                    email: credenitials.email
                }
            });
    
            if(userExist != null) {
                const passwordIsAuthenticated = compareSync(credenitials.password, userExist.password);

                if(passwordIsAuthenticated) {
                    return userExist;
                } else {
                    return false;
                }
            } else {
                return false
            }
        } catch(error) {
            console.log(error);
            return false;
        }
    }

    // async getAll() {
    //     return prismaClient.user.findMany()
    //     .then((users) => {
    //         return users;
    //     })
    //     .catch((error) => {
    //         return error;
    //     });
    // }

    // async getById(id: string) {
    //     return prismaClient.user.findUnique({
    //         where: {
    //             id
    //         }
    //     })
    //     .then((user) => {
    //         return user;
    //     })
    //     .catch((error) => {
    //         return error;
    //     });
    // }

    // async update(user: User) {
    //     return prismaClient.user.update({
    //         where: {
    //             id: user.id
    //         },
    //         data: {
    //             name: user.name,
    //             email: user.email,
    //             password: user.password
    //         }
    //     })
    //     .then((user) => {
    //         return user;
    //     })
    //     .catch((error) => {
    //         return error;
    //     });
    // }

    // async delete(id: string) {
    //     return prismaClient.user.delete({
    //         where: {
    //             id
    //         }
    //     })
    //     .then((result) => {
    //         return result;
    //     })
    //     .catch((error) => {
    //         return error;
    //     });
    // }
}