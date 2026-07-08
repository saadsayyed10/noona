import * as userServices from "../services/user.service";
import { Request, Response } from "express";

export const registerUserController = async (req: Request, res: Response) => {
  let errorMessage;
  try {
    const { name, email, username, password } = req.body;

    const data = { name, email, username, password };
    if (!data) {
      errorMessage = "Required fields are missing or invalid";
      console.log(errorMessage);
      return res.status(404).json({ error: errorMessage });
    }

    const { token, user } = await userServices.registerUserService(
      name,
      email,
      username,
      password,
    );
    res
      .status(201)
      .json({ message: `New user register - ${user.username}`, token, user });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  let errorMessage;
  try {
    const { email, password } = req.body;

    const data = { email, password };
    if (!data) {
      errorMessage = "Please enter email and password to login";
      console.log(errorMessage);
      return res.status(404).json({ error: errorMessage });
    }

    const { token, user } = await userServices.loginUserService(
      email,
      password,
    );
    res
      .status(200)
      .json({ message: `User logged in - ${user.username}`, token, user });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const checkUsernameController = async (req: Request, res: Response) => {
  try {
    const { username } = req.query;

    await userServices.checkUsernameService(username as string);
    res.status(200).json({ message: `${username} is available` });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const fetchUserProfileController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;
  try {
    const { id } = req.params;
    if (!id) {
      errorMessage = "User ID not found in params";
      console.log(errorMessage);
      return res.status(404).json({ error: errorMessage });
    }

    if (!(req as any).user) {
      errorMessage =
        "Unauthorized: Valid token is required to fetch user profile";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const user = await userServices.fetchUserProfileService(id as string);
    res.status(200).json({ message: "User profile", user });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
