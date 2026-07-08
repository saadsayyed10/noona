import { Router } from "express";
import * as controllers from "../controllers/user.controller";
import { protectAuth } from "../../middleware/authMiddleware";

const userRouter = Router();

userRouter.get(
  "/profile/all",
  protectAuth,
  controllers.fetchAllUsersController,
);
userRouter.get(
  "/profile/:id",
  protectAuth,
  controllers.fetchUserProfileController,
);

userRouter.post("/auth/register", controllers.registerUserController);
userRouter.post("/auth/login", controllers.loginUserController);
userRouter.get("/auth/username", controllers.checkUsernameController);

export default userRouter;
