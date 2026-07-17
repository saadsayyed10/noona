import { Router } from "express";
import * as controllers from "../controllers/invitation.controller";

const invitationRouter = Router();

invitationRouter.post("/:guestId", controllers.inviteFriendController);

export default invitationRouter;
