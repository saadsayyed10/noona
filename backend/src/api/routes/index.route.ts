import { Router } from "express";
import userRouter from "./user.route";
import ratingsRouter from "./rating.route";
import invitationRouter from "./invitation.route";

const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/invite", invitationRouter);
mainRouter.use("/rating", ratingsRouter);

export default mainRouter;
