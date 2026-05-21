import { Router } from "express";
import { registerUser, loginUser } from "./auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export const authRoutes = router;