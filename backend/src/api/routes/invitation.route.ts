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
invitationRouter.put(
  "/accept/:inviteId",
  protectAuth,
  controllers.acceptInviteController,
);
invitationRouter.delete(
  "/reject/:inviteId",
  protectAuth,
  controllers.rejectInviteController,
);

export default invitationRouter;
