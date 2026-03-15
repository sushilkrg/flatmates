import express from "express";
import {
  login,
  logout,
  refreshAccessToken,
  signup,
} from "../controllers/auth.controller";
import { authLimiter } from "../middlewares/rateLimiter";

const router = express.Router();

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);

export default router;
