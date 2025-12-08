"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setError, setListings } from "@/redux/slices/listingSlice";
import { useRouter } from "next/navigation";
import { setFilters } from "@/redux/slices/filterSlice";
import api from "@/utils/axiosClient";

const SearchSection = () => {
  const cityNames = ["Noida", "Gurgaon", "Chennai", "Bangalore", "Hyderabad"];
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (e: any) => {
    setLocation(e.target.innerText);
    dispatch(setFilters({ [e.target.name]: e.target.value }));
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();

      // Add pagination defaults
      params.append("page", "1"); // Reset to page 1 on new search
      params.append("limit", "15");

      params.append("location", location.trim());

      const res = await api.get(`/listing/filter?${params.toString()}`);

      if (!res || !res.data) throw new Error("Request failed");

      // Update listings with pagination data
      dispatch(
        setListings({
          results: res?.data.results || [],
          pagination: res.data.pagination,
        })
      );

      dispatch(setFilters({ [e.target.name]: e.target.value }));
      router.push("/search?page=1");
    } catch (error: any) {
      // console.error("Search error:", error);
      dispatch(
        setError(error?.response?.data?.message || "Failed to fetch listings")
      );
    }
  };

  return (
    <section className="bg-gray-800 h-[450px] md:h-[500px] px-4 flex items-center justify-center">
      <div className="container mx-auto">
        <h2 className="text-2xl text-center font-semibold mb-2">
          Search for a Flatmate/Roommate
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-20">
          <input
            type="text"
            placeholder="Enter City Name"
            value={location}
            className="p-3 border bg-white text-black rounded-md w-full md:w-1/2 focus:outline-none focus:border-blue-400"
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            name="location"
            value={location}
            onClick={(e) => handleSearch(e)}
            className="bg-blue-600 text-white py-3 px-6 rounded-md shadow-md w-full md:w-auto cursor-pointer"
          >
            Search
          </button>
        </div>
        <div className="text-center mt-4 space-x-1">
          {cityNames?.map((city, index) => (
            <button
              name="location"
              onClick={(e) => handleClick(e)}
              key={index}
              value={city}
              className="bg-[#325074]  py-1 px-4 rounded-full shadow-md cursor-pointer w-auto mt-1"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
