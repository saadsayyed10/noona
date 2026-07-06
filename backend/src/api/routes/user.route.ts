import { Router } from "express";
import * as controllers from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/auth/register", controllers.registerUserController);
userRouter.post("/auth/login", controllers.loginUserController);

export default userRouter;
