import express from "express";
import { login, logout, signup } from "../controllers/auth.controller";
import { authLimiter } from "../middlewares/rateLimiter";

const router = express.Router();

router.post("/signup",authLimiter, signup);
router.post("/login",authLimiter, login);
router.post("/logout", logout);

export default router;