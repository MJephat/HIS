import prisma from "../../shared/prisma/prisma.js";

//create department
export const createDepartment = async(data) =>{
    return prisma.department.create({
        data,
    });
};

//get departments
export const getDepartments = async ({
    page, limit, search
    }) =>{
        const skip = (page - 1) * limit;

        const where =  search ? {
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ],
        }
        :
        {};

        const [departments, total] = await Promise.all([

            prisma.department.findMany({
                where, skip, take: limit, orderBy:{createdAt: "desc",}
            }),

            prisma.department.count({
                where,
            }),
        ])

        return {
            departments, total,
        };
    };

//get departments by id
export const getDepartmentById = async (id) => {

    return prisma.department.findUnique({
        where: {
            id,
        },
    });
};

//update departments
export const updateDepartment = async(id, data)=>{
    return prisma.department.update({
        where: {
            id,
        },
        data,
    });
};


// delete department
export const deleteDepartment = async (id) => {

    await prisma.department.update({

        where: {id},
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        }
    });

};

// check if the department exists
export const departmentExists = async (name) => {
    return prisma.department.findFirst({
        where:{
            name,
        },
    });
};