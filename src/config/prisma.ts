import { PrismaClient } from "@prisma/client";
import logger from "./logger";

const prisma = new PrismaClient();

export const connect = async () => {
  try {
    await prisma.$connect();
    logger.info("DB connected");
  } catch (err: any) {
    logger.error(err?.message || "Database connection failed");
  }
};

export default prisma;
