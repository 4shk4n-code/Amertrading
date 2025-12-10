import type { PrismaClient as PrismaClientType } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClientType;
};

// Lazy initialization to avoid build errors if Prisma client isn't generated
let prismaInstance: PrismaClientType | null = null;

function createPrismaClient(): PrismaClientType {
  // Dynamic import to avoid build-time errors
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require("@prisma/client");
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const prisma = (() => {
  if (prismaInstance) {
    return prismaInstance;
  }

  try {
    prismaInstance = globalForPrisma.prisma ?? createPrismaClient();

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaInstance;
    }

    return prismaInstance;
  } catch {
    // If Prisma client isn't generated, return a proxy that throws on use
    if (process.env.NODE_ENV === "development") {
      console.warn("Prisma client not available. Run 'npx prisma generate' to fix this.");
    }
    // Return a proxy that throws helpful errors
    return new Proxy({} as PrismaClientType, {
      get() {
        throw new Error("Prisma client not initialized. Please run 'npx prisma generate'.");
      },
    });
  }
})();

