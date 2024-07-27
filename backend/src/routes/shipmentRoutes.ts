import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  getShipmentById,
  getUserShipments,
  createShipment,
  trackShipment,
} from "../controllers/shipMentController";

const router = Router();

router.get("/api/shipment/:id", authMiddleware, getShipmentById);
router.get("/api/user/shipment", authMiddleware, getUserShipments);
router.post("/api/shipment", authMiddleware, createShipment);
router.get("/api/shipment/track/:id", authMiddleware, trackShipment);

export default router;
