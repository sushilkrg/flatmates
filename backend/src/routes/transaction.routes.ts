import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  createCheckoutSession,
  getMyTransactions,
} from "../controllers/transaction.controller";
const router = express.Router();

router.post("/create-checkout-session", isAuthenticated, createCheckoutSession);
router.get("/my-transactions", isAuthenticated, getMyTransactions);

export default router;
