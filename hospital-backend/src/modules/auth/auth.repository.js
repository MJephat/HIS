import prisma from "../../shared/prisma/prisma.js";

 export const findUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
 };

 export const creatorUser = async (data) => {
    return prisma.user.create({
        data: data,
    });
 }