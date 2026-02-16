import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "@prisma/client";
import { config } from "dotenv";
import pg from "pg";
const { PrismaClient } = pkg; 

config();

// 1. Setup the pg pool
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Setup the adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the Prisma Client
const prisma = new PrismaClient({
  adapter: adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.info("DB Connected via Prisma 7 + PG Adapter");
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { connectDB, disconnectDB, prisma };
