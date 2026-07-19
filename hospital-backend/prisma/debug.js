import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    const users = await prisma.user.findMany({
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

    console.dir(users, { depth: null });

}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });