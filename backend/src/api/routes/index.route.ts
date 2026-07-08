import { Router } from "express";
import userRouter from "./user.route";
import ratingsRouter from "./rating.route";

const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/rating", ratingsRouter);

export default mainRouter;
