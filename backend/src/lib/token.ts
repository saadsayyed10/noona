// backend\src\lib\token.ts

// Import JWT class
import jwt from "jsonwebtoken";
import { env } from "../config/env.config";

// Function to generate token for a user that expires in a week
export const generateToken = async (userId: string) => {
  return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "7d" });
};
