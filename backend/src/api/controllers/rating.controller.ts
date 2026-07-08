import { Request, Response } from "express";
import { submitRatingService } from "../services/rating.service";

export const submitRatingController = async (req: Request, res: Response) => {
  try {
    const { stars, feedback } = req.body;

    const data = { stars, feedback };
    if (!data) {
      console.log("Required fields are missing");
      return res.status(404).json({ error: "Required fields are missing" });
    }

    if ((req as any).user) {
      console.log("Unauthorized: Please login to submit ratings");
      return res
        .status(401)
        .json({ error: "Unauthorized: Please login to submit ratings" });
    }

    const rating = await submitRatingService(
      (req as any).user.id,
      stars,
      feedback,
    );
    res.status(201).json({ message: "Ratings submitted", rating });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
