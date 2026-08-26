// backend\src\services\auth.service.ts

// Import libraries
import bcrypt from "bcryptjs";

// Import custom files
import prisma from "../lib/prisma";
import { generatePfp } from "../lib/pfp";
import { generateToken } from "../lib/token";

export const registerUserService = async (
  name: string,
  email: string,
  username: string,
  password: string,
) => {
  // Check for existing user
  const existingUser = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  // If registered account re-register, don't allow
  if (existingUser) throw new Error("Your account already exist");

  // Generate profile picture for user
  const profilePicture = generatePfp(name);

  // Hash user password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Register user data
  const user = await prisma.users.create({
    data: {
      name,
      email,
      username,
      password: hashedPassword,
      profilePicture,
    },
  });

  // Generate token for the particular user
  const token = generateToken(user.id);

  return { token, user }; // Return token and user data
};
