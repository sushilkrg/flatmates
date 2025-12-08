import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthenticated: No Token Provided" });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as any
    ) as CustomJwtPayload;

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }

    const user = await User.findById(decoded?.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    (req as any).user = user;
    next();
  } catch (error: any) {
    console.error("Error is isAuthenticated middleware", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
