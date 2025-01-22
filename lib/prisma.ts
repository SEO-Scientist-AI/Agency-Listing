import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient({
        log: ["query"],
        datasourceUrl: process.env.DATABASE_URL,
    });
};

const globalForPrisma = globalThis as unknown as {
    prisma: undefined | ReturnType<typeof prismaClientSingleton>;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
