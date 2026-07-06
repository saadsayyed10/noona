import express from "express";
import cors from "cors";

import { env } from "./config/env.config";
import { connectDB } from "./config/db.config";
import mainRouter from "./api/routes/index.route";

const PORT = env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", mainRouter);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("Server running on PORT:", PORT);
    });
  } catch (error: any) {
    console.log("Enable to start server: ", error.message);
  }
};

startServer();
