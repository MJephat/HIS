import prisma from "../prisma/prisma.js";

class CounterRepository {
    async next(name) {
        return prisma.$transaction(async (tx) => {
            const currentYear = new Date().getFullYear();
            const counter = await tx.counter.findUnique({
                where: {
                    name,
                },
            });

            if (!counter) {
                throw new Error(`Counter '${name}' not found.`);
            }

            let value = counter.value;

            if (
                counter.resetYearly &&
                counter.year !== currentYear
            ) {

                const updated = await tx.counter.update({
                    where: {
                        name,
                    },

                    data: {
                        value: 1,
                        year: currentYear,
                    },
                });

                return updated;
            }

            const updated = await tx.counter.update({
                where: {
                    name,
                },

                data: {
                    value: {
                        increment: 1,

                    },
                },

            });

            return updated;

        });

    }

}

export default new CounterRepository();