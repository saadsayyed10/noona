// Import Router class
import { Router } from "express";

// Import all controllers of auth in one object
import * as controllers from "../controllers/auth.controller";

const authRouter = Router();

// POST endpoints
authRouter.post("/sign-up", controllers.registerUserController);

export default authRouter;
