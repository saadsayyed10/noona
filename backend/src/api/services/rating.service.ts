import prisma from "../../lib/orm";

export const submitRatingService = async (
  userId: string,
  stars: number,
  feedback: string,
) => {
  return await prisma.ratings.create({
    data: {
      usersId: userId,
      stars,
      feedback,
    },
  });
};
