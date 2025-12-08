"use client";
import { RootState, store } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((store: RootState) => store.auth.user);

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center px-8 py-8">
          <h2 className="text-2xl font-bold">Profile</h2>
          <button className="px-4 py-2 bg-green-500 rounded-4xl text-white cursor-pointer">
            Edit profile
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mx-auto items-center justify-center mt-16">
          <div>
            {/* for image  */}
            <p className="p-12 border-gray-800 border rounded-full text-3xl">
              A1
            </p>
          </div>
          <div className="">
            {/* for details  */}
            <p>
              Name - <span className="font-semibold">{userData?.fullName}</span>
            </p>
            <p>
              Email - <span className="font-semibold">{userData?.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
