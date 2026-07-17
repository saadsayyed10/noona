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

export const fetchAllInvitesService = async (
  userId: string,
  status: "sent" | "receive",
) => {
  if (status === "sent") {
    return await prisma.users.findMany({
      where: {
        id: userId,
      },
      select: {
        sentInvitations: {
          select: {
            receiver: {
              select: {
                id: true,
                name: true,
                username: true,
                profilePicUrl: true,
              },
            },
          },
        },
      },
    });
  } else if (status === "receive") {
    return await prisma.users.findMany({
      where: {
        id: userId,
      },
      select: {
        recieveInvitations: {
          select: {
            sender: {
              select: {
                id: true,
                name: true,
                username: true,
                profilePicUrl: true,
              },
            },
          },
        },
      },
    });
  }

  return await prisma.invitations.findMany({});
};
