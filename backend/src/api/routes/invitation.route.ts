import { Router } from "express";
import * as controllers from "../controllers/invitation.controller";
import { protectAuth } from "../../middleware/authMiddleware";

const invitationRouter = Router();

invitationRouter.post(
  "/:guestId",
  protectAuth,
  controllers.inviteFriendController,
);
invitationRouter.get(
  "/all",
  protectAuth,
  controllers.fetchAllInvitesController,
);

export default invitationRouter;
