"use client";
import ListingCard from "@/components/ListingCard";
import ListingCardSkeleton from "@/components/ui/ListingCardShimmer";
import Pagination from "@/components/Pagination";
import { RootState } from "@/redux/store";
import { setListings, setLoading, setError } from "@/redux/slices/listingSlice";
import api from "@/utils/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function SearchContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const listingsData = useSelector(
    (store: RootState) => store.listings.listings
  );
  const pagination = useSelector(
    (store: RootState) => store.listings.pagination
  );
  const isLoading = useSelector((store: RootState) => store.listings.loading);
  const error = useSelector((store: RootState) => store.listings.error);

  const filters = useSelector((store: RootState) => store.filters);
  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    fetchListings(currentPage);
  }, [currentPage]);

  const fetchListings = async (page: number) => {
    try {
      dispatch(setLoading(true));

      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "15");

      if (filters.location) {
        params.append("location", filters.location);
      }
      if (filters.cityName) {
        params.append("cityName", filters.cityName);
      }
      if (filters.rent !== null && filters.rent !== undefined) {
        params.append("rent", filters.rent.toString());
      }
      if (filters.accommodationType) {
        params.append("accommodationType", filters.accommodationType);
      }
      if (filters.lookingForGender) {
        params.append("lookingForGender", filters.lookingForGender);
      }

      const response = await api.get(`/listing/filter?${params.toString()}`);

      dispatch(
        setListings({
          results: response.data.results,
          pagination: response.data.pagination,
        })
      );
    } catch (err: any) {
      dispatch(
        setError(err.response?.data?.error || "Failed to fetch listings")
      );
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/search?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookmark = async (listingId: string) => {
    try {
      const result = await api.patch(`/listing/bookmark/${listingId}`);
    } catch (error) {
      console.error("Bookmark error:", error);
    }
  };

  if (isLoading) {
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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <svg
          className="w-24 h-24 text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (listingsData?.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-white mb-2">No Results Found</h2>
        <p className="text-gray-400 mb-6">Try adjusting your search filters</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="text-center mt-8 mb-6">
        <h3 className="text-xl font-mono text-gray-300">
          Showing {listingsData.length} of {pagination?.totalListings || 0}{" "}
          results
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Page {pagination?.currentPage || 1} of {pagination?.totalPages || 1}
        </p>
      </div>

      <div className="space-y-4">
        {listingsData.map((listing) => (
          <ListingCard
            key={listing._id}
            listing={listing}
            primaryAction={{
              label: "Save",
              activeLabel: "Saved",
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
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              ),
              activeIcon: (
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
              onClick: (id) => handleBookmark(id),
              variant: "primary",
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
}
