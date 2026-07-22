import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const departments = [
    {
        name: "Administration",
        description: "Hospital Administration",
    },
    {
        name: "Outpatient",
        description: "Outpatient Department",
    },
    {
        name: "Inpatient",
        description: "Inpatient Department",
    },
    {
        name: "Emergency",
        description: "Emergency Department",
    },
    {
        name: "Laboratory",
        description: "Laboratory Services",
    },
    {
        name: "Radiology",
        description: "Radiology Department",
    },
    {
        name: "Pharmacy",
        description: "Hospital Pharmacy",
    },
    {
        name: "Finance",
        description: "Finance Department",
    },
    {
        name: "Cardiology",
        description: "Cardiology Department",
    },
    {
        name: "Pediatrics",
        description: "Pediatrics Department",
    },
    {
        name: "Surgery",
        description: "Surgical Department",
    }
];

export async function seedDepartments() {
    for (const department of departments) {
        await prisma.department.upsert({
            where: {
                name: department.name,
            },
            update: {},
            create: department,
        });
    }

    console.log("✅ Departments seeded");
}

seedDepartments()
    .catch((err) => {
        console.error(err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });