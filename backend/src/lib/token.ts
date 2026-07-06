import jwt from "jsonwebtoken";
import { env } from "../config/env.config";

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, env.JWT_SECRET!, { expiresIn: "10d" });
};
