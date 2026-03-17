"use client";
import ListingCard from "@/components/ListingCard";
import api from "@/utils/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ListingCardSkeleton from "./ui/ListingCardShimmer";
import Pagination from "./Pagination";

interface IPagination {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalListings: number;
  totalPages: number;
}

const AllListingsPage = () => {
  const [allListings, setAllListings] = useState([]);
  const [pagination, setPagination] = useState<IPagination>();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log("allListings-", allListings);
  console.log("pagination-", pagination);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    const loadingToast = toast.loading("Deleting listing...");

    // Optimistically remove from UI immediately
    const previousListings = [...allListings];
    setAllListings((prev) => prev.filter((l: any) => l._id !== id));

    try {
      const res = await api.delete(`/admin/listings/${id}`);

      toast.success(res.data.message || "Listing deleted successfully", {
        id: loadingToast,
        duration: 2000,
      });
    } catch (error: any) {
      console.error("Delete error:", error);

      // Revert the UI on error
      setAllListings(previousListings);

      toast.error(
        error?.response?.data?.message || "Failed to delete listing",
        {
          id: loadingToast,
          duration: 2000,
        },
      );
    }
  };

  useEffect(() => {
    getAllListings(currentPage);
  }, [currentPage]);

  const getAllListings = async (page: number) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "15");
      const res = await api.get(`/admin/listings?${params.toString()}`);

      if (!res) throw new Error("Request failed");

      setAllListings(res?.data?.data);
      setPagination(res?.data?.pagination);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load listings", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/admin-panel/listings?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold text-white mb-8 mt-8">
          Searching...
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!loading && allListings.length === 0) {
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
            d="M12 3V21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
          />
        </svg>
        <h2 className="text-l font-bold text-white mb-2">No Listings found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="text-center mt-8 mb-6">
        <h3 className="text-xl font-mono text-gray-300">
          Showing {allListings.length} of {pagination?.totalListings || 0}{" "}
          results
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Page {pagination?.currentPage || 1} of {pagination?.totalPages || 1}
        </p>
      </div>

      <div className="space-y-4">
        {allListings.map((listing: any) => (
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

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
        />
      )}
    </div>
  );
};

export default AllListingsPage;
