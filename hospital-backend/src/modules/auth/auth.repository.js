import prisma from "../../shared/prisma/prisma.js";

/**
 * Shared include object used by authenticated/profile requests.
 */
const userInclude = {
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
};

/**
 * Lean select used for login and registration checks.
 * Keeping this small avoids loading roles/permissions for every login attempt.
 */
const authUserSelect = {
    id: true,
    employeeNumber: true,
    firstName: true,
    middleName: true,
    lastName: true,
    email: true,
    phone: true,
    password: true,
    status: true,
    departmentId: true,
    lastLogin: true,
    createdAt: true,
    updatedAt: true,
};

/**
 * Find user by email for auth operations.
 */
export const findUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: { email },
        select: authUserSelect,
    });
};

/**
 * Find user by ID
 */
export const findUserById = async (id) => {
    return prisma.user.findUnique({
        where: { id },
        include: userInclude,
    });
};

/**
 * Create user
 */
export const createUser = async (data) => {
    return prisma.user.create({
        data,
    });
};

/**
 * Update last login
 */
export const updateLastLogin = async (userId) => {
    return prisma.user.update({
        where: { id: userId },
        data: {
            lastLogin: new Date(),
        },
    });
};

/**
 * Find role by name
 */
export const findRoleByName = async (name) => {
    return prisma.role.findUnique({
        where: { name },
    });
};

/**
 * Assign role to user
 */
export const assignRole = async (userId, roleId) => {
    return prisma.userRole.upsert({
        where: {
            userId_roleId: {
                userId,
                roleId,
            },
        },
        update: {},
        create: {
            userId,
            roleId,
        },
    });
};

/**
 * Save refresh token
 */
export const saveRefreshToken = async (userId, token, expiresAt) => {
    return prisma.refreshToken.create({
        data: {
            userId,
            token,
            expiresAt,
        },
    });
};

/**
 * Delete refresh token
 */
export const deleteRefreshToken = async (id) => {
    return prisma.refreshToken.delete({
        where: { id },
    });
};