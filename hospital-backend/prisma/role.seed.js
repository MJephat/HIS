import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    const roles = [
        {
            name: "ADMIN",
            description: "System Administrator"
        },
        {
            name: "DOCTOR",
            description: "Medical Doctor"
        },
        {
            name: "NURSE",
            description: "Hospital Nurse"
        },
        {
            name: "RECEPTIONIST",
            description: "Reception Staff"
        },
        {
            name: "LAB_TECHNICIAN",
            description: "Laboratory Technician"
        },
        {
            name: "PHARMACIST",
            description: "Hospital Pharmacist"
        }
    ];

    for (const role of roles) {

        await prisma.role.upsert({

            where: {
                name: role.name,
            },

            update: {},

            create: role,

        });

    }

    console.log("Roles seeded successfully.");

}

main()
.finally(async () => {
    await prisma.$disconnect();
});