import { Request, Response } from "express";
export const getHealthInfo = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Backend is active" });
};
