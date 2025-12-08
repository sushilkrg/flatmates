"use client";
import ListingCard from "@/components/ListingCard";
import api from "@/utils/axiosClient";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BookmarkedListingsPage = () => {
  const [mySavedListings, setMySavedListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggleBookmark = async (listingId: string) => {
    const loadingToast = toast.loading("Removing bookmark...");

    // Optimistically remove from UI immediately
    const previousListings = [...mySavedListings];
    setMySavedListings((prev) => prev.filter((l: any) => l._id !== listingId));

    try {
      await api.patch(
        `/listing/bookmark/${listingId}`,
        {},
        { withCredentials: true }
      );

      toast.success("Listing unbookmarked", {
        id: loadingToast,
        duration: 2000,
      });
    } catch (error: any) {
      // Revert the UI on error
      setMySavedListings(previousListings);

      toast.error(
        error?.response?.data?.message || "Failed to remove bookmark",
        {
          id: loadingToast,
          duration: 2000,
        }
      );
    }
  };

  useEffect(() => {
    const getMySavedListings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/listing/bookmarks`, {
          withCredentials: true,
        });

        if (!res) throw new Error("Request failed");

        const data = res?.data;
        setMySavedListings(data);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to load bookmarks",
          { duration: 3000 }
        );
      } finally {
        setLoading(false);
      }
    };

    getMySavedListings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading bookmarks...</p>
        </div>
      </div>
    );
  }

  if (!loading && mySavedListings.length === 0) {
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
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-white mb-2">No Bookmarks</h2>
        <p className="text-gray-400 mb-6">
          You haven't bookmarked any listings yet
        </p>
        <button
          onClick={() => router.push("/search")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Browse Listings
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 px-2">
        My Bookmarked Listings ({mySavedListings.length})
      </h2>
      {mySavedListings.map((listing: any) => (
        <ListingCard
          key={listing?._id}
          listing={listing}
          primaryAction={{
            label: "Remove",
            icon: (
              <svg
                className="w-4 h-4"
                fill="currentColor"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            ),
            onClick: (id) => handleToggleBookmark(id),
            variant: "warning",
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

export default BookmarkedListingsPage;
