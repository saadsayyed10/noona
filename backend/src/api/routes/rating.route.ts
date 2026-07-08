import { Router } from "express";
import { submitRatingController } from "../controllers/rating.controller";

const ratingsRouter = Router();

ratingsRouter.post("/", submitRatingController);

export default ratingsRouter;
