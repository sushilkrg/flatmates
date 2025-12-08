import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

/**
 * GLOBAL IP BASED LIMITER
 * Applies to ALL routes
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // 300 requests per IP per 15 min
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  },
});

/**
 * AUTH LIMITER (login / register)
 * Prevents brute-force attacks
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // 15 requests only
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many attempts. Please try again after 15 minutes.",
    });
  },
});
