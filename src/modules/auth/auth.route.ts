import { Router } from "express";
import { registerUser, loginUser, getMe } from "./auth.controller";
import { auth } from "./auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me",auth, getMe);

export const authRoutes = router;