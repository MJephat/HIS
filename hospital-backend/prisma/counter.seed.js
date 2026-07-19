import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const counters = [
    {
        name: "PATIENT",
        prefix: "PAT",
        digits: 6,
        resetYearly: true,
    },
    {
        name: "EMPLOYEE",
        prefix: "EMP",
        digits: 6,
        resetYearly: true,
    },
    {
        name: "INVOICE",
        prefix: "INV",
        digits: 8,
        resetYearly: false,
    },
    {
        name: "LAB_REQUEST",
        prefix: "LAB",
        digits: 6,
        resetYearly: true,
    },
    {
        name: "PRESCRIPTION",
        prefix: "RX",
        digits: 6,
        resetYearly: true,
    },
    {
        name: "ADMISSION",
        prefix: "ADM",
        digits: 6,
        resetYearly: true,
    }
];

for (const counter of counters) {

    await prisma.counter.upsert({

        where: {
            name: counter.name,
        },

        update: {},

        create: {
            ...counter,
            year: new Date().getFullYear(),
        }

    });

}

console.log("Counters seeded successfully.");

await prisma.$disconnect();