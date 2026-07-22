import prisma from "../../shared/prisma/prisma.js";

//  Create Doctor
export const createDoctor = async (data) => {
    return prisma.doctor.create({
        data,
        include: {
            user: {
                include: {
                    department: true,
                    roles: {
                        include: {
                            role: true,
                        },
                    },
                },
            },
            specialization: true,
        },
    });
};


// Find Doctor by ID
export const findDoctorById = async (id) => {
    return prisma.doctor.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                include: {
                    department: true,
                    roles: {
                        include: {
                            role: true,
                        },
                    },
                },
            },
            specialization: true,
        },
    });
};


 //Find Doctor by User ID
export const findDoctorByUserId = async (userId) => {
    return prisma.doctor.findUnique({
        where: {
            userId,
        },
        include: {
            user: {
                include: {
                    department: true,
                },
            },
            specialization: true,
        },
    });
};

/**
 * Find by License Number
 */
export const findDoctorByLicense = async (licenseNumber) => {
    return prisma.doctor.findUnique({
        where: {
            licenseNumber,
        },
    });
};

// Find by Employee Number
export const findDoctorByEmployeeNumber = async (employeeNumber) => {
    return prisma.doctor.findUnique({
        where: {
            employeeNumber,
        },
    });
};

// Get Doctors
export const getDoctors = async ({
    skip = 0,
    limit = 10,
    search = "",
    status,
    specializationId,
}) => {

    const where = {

        ...(status && { status }),

        ...(specializationId && { specializationId }),

        OR: [

            {
                licenseNumber: {
                    contains: search,
                    mode: "insensitive",
                },
            },

            {
                employeeNumber: {
                    contains: search,
                    mode: "insensitive",
                },
            },

            {
                user: {
                    firstName: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            },

            {
                user: {
                    lastName: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            },

        ],

    };

    const [doctors, total] = await Promise.all([
        prisma.doctor.findMany({

            where,

            skip,

            take: limit,

            orderBy: {
                createdAt: "desc",
            },

            include: {
                specialization: true,
                user: {
                    include: {
                        department: true,
                    },
                },
            },

        }),

        prisma.doctor.count({
            where,
        }),

    ]);

    return {
        doctors,
        total,
    };

};


//  Update Doctor

export const updateDoctor = async (id, data) => {
    return prisma.doctor.update({

        where: {
            id,
        },

        data,

        include: {
            specialization: true,
            user: {
                include: {
                    department: true,
                },
            },
        },

    });

};

//  Change Status
export const updateDoctorStatus = async ( id, status) => {
    return prisma.doctor.update({

        where: {
            id,
        },

        data: {
            status,
        },

    });

};


//  Delete Doctor
export const deleteDoctor = async (id) => {
    return prisma.doctor.delete({

        where: {
            id,
        },

    });

};


//  Get All Specializations
export const getSpecializations = async () => {
    return prisma.specialization.findMany({

        orderBy: {
            name: "asc",
        },

    });

};


// Find Specialization
export const findSpecializationById = async (id) => {
    return prisma.specialization.findUnique({

        where: {
            id,
        },

    });

};


// Find Specialization by Name
export const findSpecializationByName = async (name) => {
    return prisma.specialization.findUnique({

        where: {
            name,
        },

    });

};



//  Execute Transaction
export const transaction = async (callback) => {
    return prisma.$transaction(callback);
};