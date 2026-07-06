import prisma from "../lib/orm";

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL database");
  } catch (error: any) {
    console.log("Failed to connect to database", error.message);
  }
};
