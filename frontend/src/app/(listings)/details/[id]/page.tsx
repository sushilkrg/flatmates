"use client";

import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "@/utils/axiosClient";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ListingDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = !!user;

  const [listing, setListing] = useState<any | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listing/details/${id}`);
        if (!res) throw new Error("Failed to fetch");
        const data = await res.data.listingDetails;
        setListing(data);

        // Set initial bookmark state if API returns it
        if (data.isBookmarked !== undefined) {
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleBookmark = async (listingId: string) => {
    if (!isLoggedIn) {
      toast.error("Login to bookmark listings");
      return;
    }

    // Store previous state for rollback
    const previousBookmarkState = isBookmarked;

    try {
      const result = await api.patch(`/listing/bookmark/${listingId}`, {});
      // Sync with API response
      const newBookmarkState = result.data.isBookmarked;
      setIsBookmarked(newBookmarkState);

      toast.success(
        newBookmarkState ? "Listing bookmarked" : "Bookmark removed",
        { duration: 2000 }
      );
    } catch (error) {
      // Keep the previous state on error
      setIsBookmarked(previousBookmarkState);
      toast.error("Failed to update bookmark");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-24 h-24 text-gray-600 mb-4 mx-auto"
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
          <p className="text-white text-lg mb-4">Listing not found</p>
          <button
            onClick={() => router.push("/search")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-6 px-4 md:py-12">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to listings
        </button>

        {/* Main Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
          {/* Image Section */}
          <div className="relative w-full h-64 md:h-96 bg-gray-700">
            <Image
              src={
                listing.imageUrl ||
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop"
              }
              alt={`${listing.location} room`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
            {listing.isFeatured && (
              <span className="absolute top-4 left-4 bg-linear-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Header with Price */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {listing.location}
                </h1>
                <p className="text-lg text-gray-300 mt-1">{listing.cityName}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Posted by{" "}
                  <span className="font-medium text-gray-200">
                    {listing.postedByName}
                  </span>
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3">
                <div className="text-left md:text-right">
                  <p className="text-3xl md:text-4xl font-bold text-blue-400">
                    ₹{listing.rent.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">per month</p>
                </div>

                <button
                  onClick={() => handleBookmark(listing._id)}
                  disabled={!isLoggedIn}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer ${
                    !isLoggedIn
                      ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                      : isBookmarked
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={isBookmarked ? "currentColor" : "none"}
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
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </button>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Looking for</p>
                  <p className="text-sm font-medium text-white capitalize">
                    {listing.lookingForGender}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-purple-400"
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
                </div>
                <div>
                  <p className="text-xs text-gray-400">Type</p>
                  <p className="text-sm font-medium text-white capitalize">
                    {listing.accommodationType}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Contact</p>
                  <p className="text-sm font-medium text-white">
                    {listing.contactNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-medium text-white break-all">
                    {listing.contactEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Facilities Section */}
            {listing.facilities.length > 0 && (
              <div className="pt-6 border-t border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Facilities & Amenities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {listing.facilities.map((facility: any) => (
                    <span
                      key={facility}
                      className="bg-gray-700/60 text-gray-200 text-sm px-4 py-2 rounded-lg capitalize"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Posted Date */}
            <div className="pt-6 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                Posted on{" "}
                {new Date(listing.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Contact CTA */}
            <div className="pt-6 border-t border-gray-700 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${listing.contactNumber}`}
                className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Now
              </a>

              <a
                href={`mailto:${listing.contactEmail}`}
                className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
