import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userContoller";

/**
 * Express router for handling user routes.
 */
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
