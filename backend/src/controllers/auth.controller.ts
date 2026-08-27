// backend\src\controllers\auth.controller.ts

// Import (Request and Response) type instances
import { Request, Response } from "express";

// Import all services in an object
import * as authServices from "../services/auth.service";

// Global variable to handle error messages
let errorMessage;

/*
    Controller: To create user account
    Method: POST
    Endpoint: /api/auth/sign-up
    Authorization: No    
*/
export const registerUserController = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  const data = { name, email, username };
  // Throw error if fields are left null
  if (!data) {
    errorMessage = "Please do not leave any fields empty";
    console.log(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  // Password validation
  if (!password || password.length < 8) {
    errorMessage = "Password should be more than or equal to 8 characters";
    console.log(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const { token, user } = await authServices.registerUserService(
      name,
      email,
      username,
      password,
    );

    res.status(201).json({
      message: `Dear ${user.name} thanks for creating the account, welcome to Noona`,
      token,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

/*
    Controller: To sign-in into user account
    Method: POST
    Endpoint: /api/auth/sign-in
    Authorization: No    
*/
export const loginUserController = async (req: Request, res: Response) => {
  const { usernameOrEmail, password } = req.body;

  const data = { usernameOrEmail, password };
  // Throw error if fields are left null
  if (!data) {
    errorMessage = "Please do not leave any fields empty";
    console.log(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const { token, user } = await authServices.loginUserService(
      usernameOrEmail,
      password,
    );

    res.status(200).json({
      message: `Dear ${user.name}, welcome back to Noona`,
      token,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
