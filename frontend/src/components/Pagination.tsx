"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className={`px-4 py-2 rounded-lg font-medium transition-all${
          hasPrevPage
            ? "bg-gray-700 text-white hover:bg-gray-600 cursor-pointer"
            : "bg-gray-800 text-gray-500 cursor-not-allowed"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : page === "..."
              ? "bg-transparent text-gray-500 cursor-default"
              : "bg-gray-700 text-white hover:bg-gray-600 cursor-pointer"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          hasNextPage
            ? "bg-gray-700 text-white hover:bg-gray-600 cursor-pointer"
            : "bg-gray-800 text-gray-500 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
