"use client";
import { setUser } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";
import api from "@/utils/axiosClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store?.auth?.user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await api.post(
        `/auth/login`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch(setUser(result.data));
      router.push("/search");
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center py-12 px-2 lg:px-8">
      <div className="bg-white w-full md:w-auto py-8 md:px-8 px-6 shadow rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Welcome back to Flatmates
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Login to your account and continue
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full mt-1 text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full mt-1 text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-600 hover:text-indigo-500 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
