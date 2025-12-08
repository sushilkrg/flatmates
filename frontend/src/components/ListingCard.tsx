"use client";

import { RootState } from "@/redux/store";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

type ActionButton = {
  label: string;
  activeLabel?: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  onClick: (id: string) => void;
  variant?: "primary" | "danger" | "warning" | "secondary" | "default";
  requiresAuth?: boolean; // Add this flag
};

type ListingCardProps = {
  listing: any;
  // listing: Listing;
  primaryAction?: ActionButton;
  secondaryAction?: ActionButton;
};

const ListingCard = ({
  listing,
  primaryAction,
  secondaryAction,
}: ListingCardProps) => {
  const [isPrimaryActive, setIsPrimaryActive] = useState(false);
  const user = useSelector((state: RootState) => state?.auth.user);
  const isLoggedIn = !!user; // if user exists

  const handlePrimaryAction = () => {
    if (!primaryAction) return;

    // Check if action requires authentication
    if (primaryAction.requiresAuth && !isLoggedIn) {
      toast.error("Please login to save listings");
      return;
    }

    setIsPrimaryActive(!isPrimaryActive);
    primaryAction.onClick(listing._id);
  };

  const handleSecondaryAction = () => {
    if (!secondaryAction) return;

    // Check if action requires authentication
    if (secondaryAction.requiresAuth && !isLoggedIn) {
      toast.error("Please login first");
      return;
    }

    secondaryAction.onClick(listing._id);
  };

  const getPrimaryButtonStyles = () => {
    if (!primaryAction) return "";

    const variant = primaryAction.variant || "default";

    switch (variant) {
      case "danger":
        return "bg-red-600 text-white hover:bg-red-700";
      case "warning":
        return "bg-orange-600 text-white hover:bg-orange-700";
      case "secondary":
        return "bg-gray-600 text-white hover:bg-gray-500";
      case "primary":
        return isPrimaryActive
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-700 text-gray-200 hover:bg-gray-600";
      default:
        return "bg-gray-700 text-gray-200 hover:bg-gray-600";
    }
  };

  return (
    <article className="flex flex-col sm:flex-row bg-gray-800 border border-gray-700 rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 mx-2 my-4">
      {/* Image Section */}
      <div className="relative w-full sm:w-96 h-48 sm:h-auto bg-gray-700 shrink-0">
        <Image
          src={
            listing?.imageUrl ||
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop"
          }
          alt={`${listing?.location} room`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 288px"
        />
        {listing?.isFeatured && (
          <span className="absolute top-3 left-3 bg-linear-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Featured
          </span>
        )}
      </div>

      {/* Details Section */}
      <div className="flex flex-col justify-between p-7 flex-1">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-md font-semibold text-white leading-tight">
                {listing.location}
              </h3>
              <h3 className="text-lg font-bold text-white leading-tight">
                {listing.cityName}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Posted by{" "}
                <span className="font-medium text-gray-300">
                  {listing.postedByName}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-blue-400">
                ₹{listing.rent.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">per month</p>
            </div>
          </div>

          {/* Metadata Pills */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 bg-gray-700/60 text-gray-200 text-xs font-medium px-3 py-1 rounded-full">
              <svg
                className="w-3.5 h-3.5 text-blue-400"
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
              {listing?.lookingForGender}
            </span>

            <span className="inline-flex items-center gap-1.5 bg-gray-700/60 text-gray-200 text-xs font-medium px-3 py-1 rounded-full capitalize">
              <svg
                className="w-3.5 h-3.5 text-purple-400"
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
              {listing?.accommodationType}
            </span>
          </div>

          {/* Facilities */}
          {listing.facilities.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {listing.facilities.slice(0, 3).map((facility: any) => (
                <span
                  key={facility}
                  className="text-xs bg-gray-700/40 text-gray-300 px-2 py-0.5 rounded"
                >
                  {facility}
                </span>
              ))}
              {listing.facilities.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{listing.facilities.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 md:gap-20 mt-4">
          {/* Primary Action Button */}
          {primaryAction && (
            <button
              onClick={handlePrimaryAction}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer font-medium text-sm transition-all duration-200 ${getPrimaryButtonStyles()}`}
            >
              {isPrimaryActive && primaryAction.activeIcon
                ? primaryAction.activeIcon
                : primaryAction.icon}
              {isPrimaryActive && primaryAction.activeLabel
                ? primaryAction.activeLabel
                : primaryAction.label}
            </button>
          )}

          {/* Secondary Action Button */}
          {secondaryAction && (
            <button
              onClick={handleSecondaryAction}
              className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2.5 rounded-lg cursor-pointer font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {secondaryAction.icon}
              {secondaryAction.label}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ListingCard;
