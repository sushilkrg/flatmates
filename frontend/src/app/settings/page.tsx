"use client";
import React, { useState } from "react";

const Settings = () => {
  const [theme, setTheme] = useState("light");

  return (
    <div className="bg-white text-black w-full min-h-screen py-8 md:px-18 px-6 shadow">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold pb-8">Settings page</h2>
        <h3 className="text-xl font-bold">Account & Profile</h3>
        <p className="font-semibold">update profile</p>

        <h3 className="mt-4 font-bold">Security & Privacy</h3>
        <p>change password</p>

        <div className="flex items-center mt-4 gap-2">
          <div className="flex justify-between items-center gap-2">
            <label
              htmlFor="theme"
              className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-1"
            >
              Theme
            </label>
            <select
              id="theme"
              name="theme"
              className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-200  py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900  sm:text-sm"
              onChange={(e) => setTheme(e.target.value)}
              value={theme}
            >
              <option value="light">🌞 Light</option>
              <option value="dark">🌚 Dark</option>
            </select>
          </div>
        </div>

        <h3 className="mt-4">Terms of Service</h3>
      </div>
    </div>
  );
};

export default Settings;
