import { Request, Response } from "express";
import * as invitationServices from "../services/invitation.service";

export const inviteFriendController = async (req: Request, res: Response) => {
  let errorMessage;
  try {
    if (!(req as any).user) {
      errorMessage = "Unauthorized: Please login to send invitation";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const { guestId } = req.params;
    if (!guestId) {
      errorMessage = "Receiver ID not found in params";
      console.log(errorMessage);
      return res.status(404).json({ error: errorMessage });
    }

    await invitationServices.inviteFriendService(
      (req as any).user.id,
      guestId as string,
    );

    res.status(201).json({ message: "Invitation sent successfully." });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const fetchAllInvitesController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;
  try {
    if (!(req as any).user) {
      errorMessage = "Unauthorized: Please login to fetch all invitations";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const { status } = req.query;

    const invitations = await invitationServices.fetchAllInvitesService(
      (req as any).user.id,
      status as "sent" | "receive",
    );

    res.status(200).json({ total: invitations.length, invitations });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};
