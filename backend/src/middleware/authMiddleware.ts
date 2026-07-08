import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env.config";
import prisma from "../lib/orm";

interface DecodeToken extends JwtPayload {
  userId: string;
}

export const protectAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errorMessage;
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      errorMessage = "Unauthorized: Token not provided";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET!) as DecodeToken;

    const user = await prisma.users.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    if (!user) {
      errorMessage = "Unauthorized: User not found";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    (req as any).user = user;

    next();
  } catch (error: any) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }
};
