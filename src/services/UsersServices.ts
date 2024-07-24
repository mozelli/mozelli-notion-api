import { User } from "@prisma/client";
import prismaClient from "../prisma";

export default class UsersServices {

    async create(user: User) {
        return prismaClient.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            },
            select: {
                name: true,
                email: true,
                password: false
            },
            
        })
        .then((newUser) => {
            return newUser;
        })
        .catch((error) => {
            return error;
        });
    }

    async getAll() {
        return prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
        })
        .then((users) => {
            return users;
        })
        .catch((error) => {
            return error;
        });
    }

    async getById(id: string) {
        return prismaClient.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
        })
        .then((user) => {
            return user;
        })
        .catch((error) => {
            return error;
        });
    }

    async update(user: User) {
        return prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        })
        .then((user) => {
            return user;
        })
        .catch((error) => {
            return error;
        });
    }

    async delete(id: string) {
        return prismaClient.user.delete({
            where: {
                id
            }
        })
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return error;
        });
    }
}