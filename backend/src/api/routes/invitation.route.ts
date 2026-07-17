import { Router } from "express";
import * as controllers from "../controllers/invitation.controller";
import { protectAuth } from "../../middleware/authMiddleware";

const invitationRouter = Router();

invitationRouter.post(
  "/:guestId",
  protectAuth,
  controllers.inviteFriendController,
);

export default invitationRouter;
