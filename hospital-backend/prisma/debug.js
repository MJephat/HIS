import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const user = await prisma.user.findFirst({
    include: {
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
    },
});

console.dir(user, { depth: null });

await prisma.$disconnect();