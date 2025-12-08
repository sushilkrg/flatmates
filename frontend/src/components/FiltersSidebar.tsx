"use client";
import { resetFilters, setFilters } from "@/redux/slices/filterSlice";
import {
  setListings,
  setLoading,
  setError,
  clearListings,
} from "@/redux/slices/listingSlice";
import { RootState } from "@/redux/store";
import api from "@/utils/axiosClient";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function FiltersSidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const filters = useSelector((state: RootState) => state.filters);

  const fetchFilteredListings = async () => {
    try {
      dispatch(setLoading(true));

      // Build query params manually
      const params = new URLSearchParams();

      // Add pagination defaults
      params.append("page", "1"); // Reset to page 1 on new search
      params.append("limit", "15");

      // Add filters only if they have values
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

      const url = `/listing/filter?${params.toString()}`;

      const res = await api.get(url);
      if (!res || !res.data) throw new Error("Request failed");

      // Update listings with pagination data
      dispatch(
        setListings({
          results: res.data.results || [],
          pagination: res.data.pagination,
        })
      );

      // Navigate to search page with page=1
      router.push("/search?page=1");
    } catch (error: any) {
      // console.error("Search error:", error);
      dispatch(
        setError(error?.response?.data?.error || "Failed to fetch listings")
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch(setFilters({ [e.target.name]: e.target.value }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(clearListings());
    router.push("/search");
  };

  const handleSearch = () => {
    fetchFilteredListings();
  };

  return (
    <div className="border border-gray-700 bg-gray-800 p-4 rounded-lg shadow-sm space-y-4 md:sticky top-24">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
        <button
          onClick={handleReset}
          className="bg-gray-700 text-white text-sm px-3 py-1 rounded hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="e.g., Sector 54"
          className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          City Name
        </label>
        <input
          type="text"
          name="cityName"
          value={filters.cityName}
          onChange={handleChange}
          placeholder="e.g., Delhi"
          className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Max Rent (₹)
        </label>
        <input
          name="rent"
          type="number"
          min={0}
          max={200000}
          value={filters.rent ?? ""}
          onChange={handleChange}
          placeholder="e.g., 15000"
          className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Accommodation Type
        </label>
        <select
          name="accommodationType"
          value={filters.accommodationType}
          onChange={handleChange}
          className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
        >
          <option value="">Any</option>
          <option value="flatmate">Flatmate</option>
          <option value="roommate">Roommate</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Looking For Gender
        </label>
        <select
          name="lookingForGender"
          value={filters.lookingForGender}
          onChange={handleChange}
          className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:outline-none focus:border-blue-500"
        >
          <option value="">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-linear-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700  text-white font-semibold py-2 px-4 rounded transition shadow-md hover:shadow-lg cursor-pointer"
      >
        Apply Filters
      </button>
    </div>
  );
}
