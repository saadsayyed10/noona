import prisma from "../../lib/orm";

export const inviteFriendService = async (
  senderId: string,
  receiverId: string,
) => {
  const existing = await prisma.invitations.findUnique({
    where: {
      senderId_receiverId: {
        senderId,
        receiverId,
      },
    },
  });
  if (existing)
    throw new Error("You have already sent an invitation to this user");

  const invite = await prisma.invitations.create({
    data: {
      senderId,
      receiverId,
    },
  });

  return invite;
};
