import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userContoller";

const router = Router();

router.post("/api/register", registerUser);
router.post("/api/login", loginUser);

export default router;
