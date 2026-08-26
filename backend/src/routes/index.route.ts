// backend\src\routes\index.route.ts

import { Router } from "express";
import authRouter from "./auth.route";

const mainRouter = Router(); // Instance of main endpoint ("/api")

mainRouter.use("/auth", authRouter); // Auth routes

export default mainRouter;
