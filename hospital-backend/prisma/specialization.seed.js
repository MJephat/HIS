import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const specializations = [

    {
        name: "General Medicine",
        description: "General Physician",
    },

    {
        name: "Cardiology",
        description: "Heart Specialist",
    },

    {
        name: "Neurology",
        description: "Brain & Nervous System",
    },

    {
        name: "Orthopedics",
        description: "Bone Specialist",
    },

    {
        name: "Pediatrics",
        description: "Children Specialist",
    },

    {
        name: "Dermatology",
        description: "Skin Specialist",
    },

    {
        name: "Psychiatry",
        description: "Mental Health",
    },

    {
        name: "Radiology",
        description: "Imaging Specialist",
    },

    {
        name: "ENT",
        description: "Ear Nose and Throat",
    },

    {
        name: "Ophthalmology",
        description: "Eye Specialist",
    },

    {
        name: "Gynecology",
        description: "Women's Health",
    },

    {
        name: "Anesthesiology",
        description: "Anesthesia Specialist",
    }

];

export default async function seedSpecializations() {

    for (const specialization of specializations) {

        await prisma.specialization.upsert({

            where: {
                name: specialization.name,
            },

            update: {},

            create: specialization,

        });

    }

    console.log("✅ Specializations seeded");
}
    seedSpecializations()
        .catch((err) => {
            console.error(err);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });

