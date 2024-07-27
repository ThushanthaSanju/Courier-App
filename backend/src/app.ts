import "reflect-metadata";
import express from "express";
import AppDataSource from "./config/data-source";
import { json } from "body-parser";
import authRoutes from "./routes/userRoutes";
import shipmentRoutes from "./routes/shipmentRoutes";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(json());

/**
 * The port number for the server.
 * If the `PORT` environment variable is set, it will be used. Otherwise, the default value is 3000.
 */
const PORT = process.env.PORT || 3000;

// Initialize the database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");

    // Use the route files
    app.use("/api/auth", authRoutes);
    app.use("/api/shipments", shipmentRoutes);

    // Use errorHandler middleware after initializing the database
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
