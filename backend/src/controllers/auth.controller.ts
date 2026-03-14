import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { generateTokenAndSetCookies } from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    const newUser = await authService.signupService(fullName, email, password);

    generateTokenAndSetCookies(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authService.loginService(email, password);

    generateTokenAndSetCookies(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await authService.logoutService();

    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      expires: new Date(0),
    });

    res.status(200).json({
      message: "User logout successfully",
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
