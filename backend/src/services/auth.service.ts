// backend\src\services\auth.service.ts

import prisma from "../lib/prisma";

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
};
