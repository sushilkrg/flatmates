import User from "../models/User";
import bcrypt from "bcryptjs";

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

  const newUser = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return newUser;
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

  return user;
};

export const logoutService = async () => {
  return { message: "User logout successfully" };
};
