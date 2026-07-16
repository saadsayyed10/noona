import { createClient } from "redis";
import { env } from "./env.config";

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("Connecting to Redis...");
});

redisClient.on("ready", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", () => {
  console.log("Failed to connect to Redis");
});

redisClient.on("end", () => {
  console.log("Redis connection closed");
});
