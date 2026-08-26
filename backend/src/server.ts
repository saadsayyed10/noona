// backend\src\server.ts

// Import all libraries
import express, { Request, Response } from "express";
import cors from "cors";

// Import custom files
import { env } from "./config/env.config";
import { connectToDB } from "./config/db.config";
import mainRouter from "./routes/index.route";

const app = express(); // REST server instance
const PORT = env.PORT; // Custom PORT

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api", mainRouter);

// Check health API endpoint
app.get("/ping", (_req: Request, res: Response) => {
  res.json({ status: 200 });
});

// Function to start server asynchronously
const startServer = async () => {
  await connectToDB();

  app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
};

startServer(); // Run server
