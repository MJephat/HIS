import prisma from "../../shared/prisma/prisma.js";

// Find user by email
export const findUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            department: true,
            roles: {
                include: {
                    role: {
                        include: {
                            permissions: {
                                include: {
                                    permission: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};

// Create user
export const createUser = async (data) => {
    return prisma.user.create({
        data,
    });
};

// Save refresh token
export const saveRefreshToken = async (
    userId,
    token,
    expiresAt
) => {
    return prisma.refreshToken.create({
        data: {
            userId,
            token,
            expiresAt,
        },
    });
};

// Delete refresh token
export const deleteRefreshToken = async (id) => {
    return prisma.refreshToken.delete({
        where: {
            id,
        },
    });
};

// update last login time
export const updateLastLogin = async (userId) => {
    return prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            lastLogin: new Date(),
        },
    });
};

// me
export const findUserById = async (id) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
  include: {
            department: true,
            roles: {
                include: {
                    role: true,
                    },
                },
        },
    });
};
