"use client";
import ListingCard from "@/components/ListingCard";
import api from "@/utils/axiosClient";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyListingsPage = () => {
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    const loadingToast = toast.loading("Deleting listing...");

    // Optimistically remove from UI immediately
    const previousListings = [...myListings];
    setMyListings((prev) => prev.filter((l: any) => l._id !== id));

    try {
      const res = await axios.delete(`/api/v1/listing/${id}`, {
        withCredentials: true,
      });

      toast.success(res.data.message || "Listing deleted successfully", {
        id: loadingToast,
        duration: 2000,
      });
    } catch (error: any) {
      console.error("Delete error:", error);

      // Revert the UI on error
      setMyListings(previousListings);

      toast.error(
        error?.response?.data?.message || "Failed to delete listing",
        {
          id: loadingToast,
          duration: 2000,
        }
      );
    }
  };

  useEffect(() => {
    const getMyListings = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/listing/mylistings`, {
          withCredentials: true,
        });

        if (!res) throw new Error("Request failed");

        const data = res?.data;
        setMyListings(data);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to load listings",
          { duration: 3000 }
        );
      } finally {
        setLoading(false);
      }
    };

    getMyListings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your listings...</p>
        </div>
      </div>
    );
  }

  if (!loading && myListings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <svg
          className="w-24 h-24 text-gray-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <h2 className="text-2xl font-bold text-white mb-2">No Listings Yet</h2>
        <p className="text-gray-400 mb-6">
          Create your first listing to get started
        </p>
        <button
          onClick={() => router.push("/add-listing")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add New Listing
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 px-2">
        My Listings ({myListings.length})
      </h2>
      {myListings.map((listing: any) => (
        <ListingCard
          key={listing?._id}
          listing={listing}
          primaryAction={{
            label: "Delete",
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            ),
            onClick: (id) => handleDelete(id),
            variant: "danger",
            requiresAuth: true,
          }}
          secondaryAction={{
            label: "View Details",
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            ),
            onClick: (id) => router.push(`/details/${id}`),
          }}
        />
      ))}
    </div>
  );
};

export default MyListingsPage;
