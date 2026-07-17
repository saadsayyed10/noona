import bcrypt from "bcryptjs";
import { generateToken } from "../../lib/token";
import prisma from "../../lib/orm";
import { redisClient } from "../../config/redis.config";

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

export const checkUsernameService = async (username: string) => {
  const user = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  if (user?.username === username) {
    throw new Error("This username is taken");
  }

  return user;
};

export const fetchUserProfileService = async (userId: string) => {
  return await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      friends: true,
      username: true,
      bio: true,
      profilePicUrl: true,
      createdAt: true,
    },
  });
};

export const fetchAllUsersService = async () => {
  const cacheKey = "user:all";

  const cachedUsers = await redisClient.get(cacheKey);

  if (cachedUsers) {
    console.log("All users: Cache Hit");

    return JSON.parse(cachedUsers);
  }

  console.log("All users: Cache Miss");

  const users = await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      profilePicUrl: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  await redisClient.set(cacheKey, JSON.stringify(users), {
    EX: 300,
  });

  return users;
};

export const updateUserProfileService = async (
  userId: string,
  name: string,
  username: string,
  profilePicUrl: string,
  bio: string,
) => {
  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      name,
      username,
      bio,
      profilePicUrl,
    },
  });
};

export const deleteUserProfileService = async (userId: string) => {
  return await prisma.users.delete({
    where: {
      id: userId,
    },
  });
};
