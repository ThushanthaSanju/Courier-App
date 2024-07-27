import "reflect-metadata";
import express from "express";
import AppDataSource from "./data-source";
import { json } from "body-parser";
import authRoutes from "./routes/userRoutes";
import shipmentRoutes from "./routes/shipmentRoutes";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(json());

const PORT = process.env.PORT || 3000;

// Initialize the database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");

    // Use the route files
    app.use("/auth", authRoutes);
    app.use("/shipments", shipmentRoutes);

    // Use errorHandler middleware after initializing the database
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
