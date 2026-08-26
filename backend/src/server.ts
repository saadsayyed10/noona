import express, { Request, Response } from "express";
import cors from "cors";
import { env } from "./config/env.config";

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use(cors());

app.get("/ping", (_req: Request, res: Response) => {
  res.json({ status: 200 });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
