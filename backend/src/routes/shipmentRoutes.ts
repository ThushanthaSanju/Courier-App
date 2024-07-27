import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  getShipmentById,
  getUserShipments,
  createShipment,
  trackShipment,
} from "../controllers/shipMentController";

/**
 * Express router for managing shipment routes.
 */
const router = Router();

/**
 * GET route to retrieve a shipment by its ID.
 * Requires authentication middleware.
 */
router.get("/shipment/:id", authMiddleware, getShipmentById);

/**
 * GET route to retrieve shipments for a specific user.
 * Requires authentication middleware.
 */
router.get("/user/shipment", authMiddleware, getUserShipments);

/**
 * POST route to create a new shipment.
 * Requires authentication middleware.
 */
router.post("/shipment", authMiddleware, createShipment);

/**
 * GET route to track a shipment by its ID.
 * Requires authentication middleware.
 */
router.get("/shipment/track/:id", authMiddleware, trackShipment);

export default router;
