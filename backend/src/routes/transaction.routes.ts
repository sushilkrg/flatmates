import express from "express";
import {
  createCheckoutSession,
  getMyTransactions,
} from "../controllers/transaction.controller";
import { protectRoute } from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.get("/my-transactions", protectRoute, getMyTransactions);

export default router;
