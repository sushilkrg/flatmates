import { Request, Response } from "express";
import Stripe from "stripe";
import * as transactionService from "../services/transaction.service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-10-29.clover",
});

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { listingId, amount } = req.body;

    const userId = (req as any).user._id.toString();

    const session = await transactionService.createCheckoutSessionService(
      listingId,
      amount,
      userId,
    );

    res.status(200).json({
      success: true,
      url: session.url,
      id: session.id,
    });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ message: "Stripe error" });
  }
};

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];

  if (!sig || typeof sig !== "string") {
    return res.status(400).send("Missing or invalid Stripe signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (err: any) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    await transactionService.stripeWebhookService(event);

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook processing error:", err);
    res.status(500).json({ error: "Webhook processing failed" });
  }
};

export const getMyTransactions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id.toString();

    const transactions =
      await transactionService.getMyTransactionsService(userId);

    res.status(200).json(transactions);
  } catch (err: any) {
    console.error("Error in getMyTransactions", err);
    res.status(500).json({ error: err.message });
  }
};
