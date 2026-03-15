import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

export const signupService = async (
  fullName: string,
  email: string,
  password: string,
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already taken");
  }

  if (password.length < 6) {
    throw new Error("Password must be atleast 6 characters long");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  await user.save();

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
    role: user.role,
  });

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
    role: user.role,
  });

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

export const logoutService = async (refreshToken: string) => {
  const user = await User.findOne({ refreshToken });

  if (!user) {
    return;
  }

  // Remove refresh token from database
  user.refreshToken = undefined;
  await user.save();
};

export const refreshAccessTokenService = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
  ) as any;

  const user = await User.findById(decoded.userId);

  if (!user || user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return newAccessToken;
};
