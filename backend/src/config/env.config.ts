import "dotenv/config";

export const env = {
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.JWT_SECRET || "sameoldtreva",
  REDIS_URL: process.env.REDIS_URL!,
};
