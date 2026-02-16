import express from "express";
import { config } from "dotenv";

import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger.js";

import { connectDB, disconnectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

config();
connectDB();

const app = express();

//Body parsing middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/auth", authRoutes);
app.use("/review", reviewRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.info(`Server running on the port ${PORT}`);
});

//Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

