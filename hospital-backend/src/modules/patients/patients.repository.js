import prisma from "../../shared/prisma/prisma.js";

export const createPatient = async (data) => {
    return prisma.patient.create({
        data,
    });
};

export const patientExists = async (nationalId) => {

    if (!nationalId) return null;

    return prisma.patient.findUnique({
        where: {
            nationalId,
        },
    });

};

export const getPatientById = async (id) => {
    return prisma.patient.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });
};


export const findByNationalId = async (nationalId) => {
    if (!nationalId) return null;

    return prisma.patient.findUnique({
        where: {
            nationalId,
        },
    });

};

export const findByPhone = async (phone) => {
    return prisma.patient.findFirst({
        where: {
            phone,
            isDeleted: false,
        },
    });

};


export const findByEmail = async (email) => {
    if (!email) return null;
    return prisma.patient.findFirst({
        where: {
            email,
            isDeleted: false,
        },
    });

};


export const updatePatient = async (id, data) => {
    return prisma.patient.update({
        where: {
            id,
        },
        data,
    });

};


export const softDelete = async (id) => {
    return prisma.patient.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
            isActive: false,
        },
    });

};


export const restore = async (id) => {
    return prisma.patient.update({
        where: {
            id,
        },
        data: {
            isDeleted: false,
            deletedAt: null,
            isActive: true,
        },
    });

};

export const getPatients = async ({ skip, limit, search }) => {
    const where = {
        isDeleted: false,
        OR: [
            {
                patientNumber: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                firstName: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                lastName: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                nationalId: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                phone: {
                    contains: search,
                },
            },
        ],

    };

    const [patients, total] = await Promise.all([
        prisma.patient.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma.patient.count({
            where,
        }),
    ]);

    return {
        patients,
        total,
    };

};