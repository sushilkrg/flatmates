"use client";
import { useRouter } from "next/navigation";
import React from "react";

const TransactionCancelledPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-8 inline-block">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">
          Payment Cancelled
        </h1>

        <p className="text-gray-400 mb-8">
          Your transaction was cancelled. No charges were made.
        </p>

        <button
          onClick={() => router.push("/search")}
          className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer"
        >
          Back to Search
        </button>
      </div>
    </div>
  );
};

export default TransactionCancelledPage;
