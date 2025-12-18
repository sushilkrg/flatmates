import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import authRoutes from "./routes/auth.routes";
import listingRoutes from "./routes/listing.routes";
import transactionRoutes from "./routes/transaction.routes";
import healthRoutes from "./routes/health.routes";
import connectDB from "./config/db";
import { stripeWebhook } from "./controllers/transaction.controller";
import { apiLimiter } from "./middlewares/rateLimiter";
// import { apiLimiter } from "./middlewares/rateLimiter";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();

app.set("trust proxy", 1);

// Global IP based rate limiter
app.use(apiLimiter);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

app.use(cookieParser());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

connectDB();

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/listing", listingRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/health", healthRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  console.error("MONGO_URI not defined");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
