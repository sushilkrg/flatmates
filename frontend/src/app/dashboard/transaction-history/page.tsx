"use client";
import TransactionCard from "@/components/TransactionCard";
import TransactionCardSkeleton from "@/components/ui/TransactionCardSkeleton";
import api from "@/utils/axiosClient";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Transactions = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTransactionHistory() {
      try {
        setLoading(true);
        const res = await api.get(`/transaction/my-transactions`, {
          withCredentials: true,
        });
        setTransactionData(res?.data);
      } catch (error: any) {
        console.error("Transaction fetch error:", error);
        toast.error(
          error?.response?.data?.message || "Error fetching transaction data",
          { duration: 3000 }
        );
      } finally {
        setLoading(false);
      }
    }

    getTransactionHistory();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6 px-2">
          Transaction History
        </h2>
        {[1, 2, 3].map((i) => (
          <TransactionCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!loading && transactionData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="bg-gray-800 rounded-full p-6 mb-6">
          <svg
            className="w-24 h-24 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          No Transaction History
        </h2>
        <p className="text-gray-400 text-center mb-6 max-w-md">
          You haven't made any transactions yet. Featured listings and payments
          will appear here.
        </p>
        <button
          onClick={() => (window.location.href = "/add")}
          className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Create a Featured Listing
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 px-2">
        Transaction History ({transactionData.length})
      </h2>
      <div className="space-y-4">
        {transactionData.map((transaction: any) => (
          <TransactionCard key={transaction?._id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
