import Stripe from "stripe";
import Listing from "../models/Listing";
import Transaction from "../models/Transaction";
import User from "../models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-10-29.clover",
});

export const createCheckoutSessionService = async (
  listingId: string,
  amount: number,
  userId: string,
) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    billing_address_collection: "required",
    customer_creation: "always",

    success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: { name: "Feature Listing" },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],

    metadata: {
      listingId,
      userId,
    },
  });

  return session;
};

export const stripeWebhookService = async (event: Stripe.Event) => {
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const { listingId, userId } = session.metadata as {
      listingId: string;
      userId: string;
    };

    // Update listing to featured
    await Listing.findByIdAndUpdate(listingId, { isFeatured: true });

    // Save transaction
    const newTransaction = await Transaction.create({
      userId,
      listingId,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      status: "success",
      stripeSessionId: session.id,
      paymentIntentId: session.payment_intent as string,
    });

    // Add transaction to user
    await User.findByIdAndUpdate(userId, {
      $push: { myTransactions: newTransaction._id },
    });

    return newTransaction;
  }

  return null;
};

export const getMyTransactionsService = async (userId: string) => {
  const user = await User.findById(userId).populate({
    path: "myTransactions",
    options: { sort: { createdAt: -1 } },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.myTransactions || [];
};
