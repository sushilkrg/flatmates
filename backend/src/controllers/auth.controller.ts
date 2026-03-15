import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    // const newUser = await authService.signupService(fullName, email, password);

    //   generateTokenAndSetCookies(newUser._id, res);

    //   res.status(201).json({
    //     _id: newUser._id,
    //     fullName: newUser.fullName,
    //     email: newUser.email,
    //   });
    // } catch (err: any) {
    //   res.status(400).json({ error: err.message });
    // }
    const { user, accessToken, refreshToken } = await authService.signupService(
      fullName,
      email,
      password,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await authService.loginService(
      email,
      password,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// export const logout = async (req: Request, res: Response) => {
//   try {
//     await authService.logoutService();

//     res.cookie("token", "", {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       path: "/",
//       expires: new Date(0),
//     });

//     res.status(200).json({
//       message: "User logout successfully",
//     });
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await authService.logoutService(refreshToken);
    }

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token" });
    }

    const newAccessToken =
      await authService.refreshAccessTokenService(refreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (err: any) {
    res.status(403).json({
      error: err.message,
    });
  }
};
