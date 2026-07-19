import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    // Roles
    const roles = [
        "SUPER_ADMIN",
        "ADMIN",
        "DOCTOR",
        "NURSE",
        "PHARMACIST",
        "LAB_TECHNICIAN",
        "RECEPTIONIST",
        "ACCOUNTANT",
        "PATIENT"
    ];

    for (const role of roles) {

        await prisma.role.upsert({

            where: {
                name: role,
            },

            update: {},

            create: {
                name: role,
            }

        });

    }

    console.log("Roles seeded successfully.");
}


main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });


    