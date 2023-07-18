import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const isProduction = (process.env["NODE_ENV"] as string) === "production";
const isDevelopment = (process.env["NODE_ENV"] as string) === "development";

export const prisma = new PrismaClient({
  log: isDevelopment ? ["query"] : [],
  errorFormat: isProduction ? "minimal" : "colorless",
});
