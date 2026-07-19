import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    const admin = await prisma.role.findUnique({
        where: {
            name: "ADMIN",
        },
    });

    if (!admin) {
        throw new Error("ADMIN role not found.");
    }

    const permissions = await prisma.permission.findMany();

    for (const permission of permissions) {

        await prisma.rolePermission.upsert({

            where: {
                roleId_permissionId: {
                    roleId: admin.id,
                    permissionId: permission.id,
                },
            },

            update: {},

            create: {
                roleId: admin.id,
                permissionId: permission.id,
            },

        });

    }

    console.log(`Assigned ${permissions.length} permissions to ADMIN.`);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });