import bcrypt from "bcryptjs";
import { generateToken } from "../../lib/token";
import prisma from "../../lib/orm";

export const registerUserService = async (
  name: string,
  email: string,
  username: string,
  password: string,
) => {
  const existingUser = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) throw new Error("User already exists");

  if (username.length < 3)
    throw new Error("Username should contain atleast 3 or more characters");

  if (password.length < 8)
    throw new Error("Password should contain atleast 8 or more characters");

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      username,
      password: hashPassword,
    },
  });

  const token = generateToken(user.id!);

  return { token, user };
};

export const loginUserService = async (email: string, password: string) => {
  const existingUser = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (!existingUser) throw new Error("User account does not exist");

  const verifyPassword = await bcrypt.compare(password, existingUser.password);
  if (!verifyPassword) throw new Error("Password is incorrect");

  const token = generateToken(existingUser.id!);

  return { token, user: existingUser };
};
