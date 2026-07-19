import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const permissions = [

    "department.read",
    "department.create",
    "department.update",
    "department.delete",

    "patient.read",
    "patient.create",
    "patient.update",
    "patient.delete",

    "doctor.read",
    "doctor.create",
    "doctor.update",
    "doctor.delete",

    "appointment.read",
    "appointment.create",
    "appointment.update",
    "appointment.delete",

    "billing.read",
    "billing.create",
    "billing.update",

    "laboratory.read",
    "laboratory.create",

    "pharmacy.read",
    "pharmacy.create"

];

async function main() {

    for (const permission of permissions) {

        await prisma.permission.upsert({

            where: {

                name: permission,

            },

            update: {},

            create: {

                name: permission,

            }

        });

    }

    console.log("Permissions seeded.");
}

main()
.finally(() => prisma.$disconnect());