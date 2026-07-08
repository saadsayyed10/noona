import { Router } from "express";
import { submitRatingController } from "../controllers/rating.controller";
import { protectAuth } from "../../middleware/authMiddleware";

const ratingsRouter = Router();

ratingsRouter.post("/", protectAuth, submitRatingController);

export default ratingsRouter;
