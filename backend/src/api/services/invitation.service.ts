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
              id: true,
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
            id: true,
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

export const acceptInviteService = async (inviteId: string, userId: string) => {
  const invitation = await prisma.invitations.update({
    where: {
      id: inviteId,
      status: false,
    },
    data: {
      status: true,
    },
  });

  await prisma.$transaction([
    prisma.users.update({
      where: {
        id: invitation.receiverId,
      },
      data: {
        friends: {
          push: invitation.senderId,
        },
      },
    }),

    prisma.users.update({
      where: {
        id: invitation.senderId,
      },
      data: {
        friends: {
          push: invitation.receiverId,
        },
      },
    }),
  ]);

  return "Invitation accepted";
};
