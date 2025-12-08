"use client";
import { setFilters } from "@/redux/slices/filterSlice";
import { setError, setListings } from "@/redux/slices/listingSlice";
import api from "@/utils/axiosClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const cities = [
  {
    name: "Delhi",
    imgSrc:
      "https://images.unsplash.com/photo-1665558646240-b2190160c400?q=80&w=1019&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mumbai",
    imgSrc:
      "https://images.unsplash.com/photo-1706599452122-e74ded244564?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Noida",
    imgSrc:
      "https://images.unsplash.com/photo-1655747543289-74baefbfa184?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bangalore",
    imgSrc:
      "https://images.unsplash.com/photo-1561191223-2b9c2ee42b23?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pune",
    imgSrc:
      "https://images.unsplash.com/photo-1598011785286-ec88ea088fc8?q=80&w=532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ahmedabad",
    imgSrc:
      "https://images.unsplash.com/photo-1759607236409-1df137ecb3b6?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Gurgaon",
    imgSrc:
      "https://images.unsplash.com/photo-1703360171163-2b1b8836cf6c?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Hyderabad",
    imgSrc:
      "https://images.unsplash.com/photo-1711102230980-5f3001c1a07b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Kolkata",
    imgSrc:
      "https://images.unsplash.com/photo-1693335920600-cc67e0fb51c3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Chennai",
    imgSrc:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Chandigarh",
    imgSrc:
      "https://images.unsplash.com/photo-1730638426373-1630ca57e325?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jaipur",
    imgSrc:
      "https://images.unsplash.com/photo-1642006139624-6313327f92f1?q=80&w=818&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const PopularCities = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    try {
      const params = new URLSearchParams();

      // Add pagination defaults
      params.append("page", "1"); // Reset to page 1 on new search
      params.append("limit", "15");

      params.append("location", value.trim());

      const res = await api.get(`/listing/filter?${params.toString()}`);

      if (!res || !res.data) throw new Error("Request failed");

      // Update listings with pagination data
      dispatch(
        setListings({
          results: res?.data.results || [],
          pagination: res.data.pagination,
        })
      );

      dispatch(setFilters({ [name]: value }));
      router.push("/search?page=1");
    } catch (error: any) {
      // console.error("Search error:", error);
      dispatch(
        setError(error?.response?.data?.message || "Failed to fetch listings")
      );
    }
  };

  return (
    <section className="container mx-auto px-4 md:px-8 py-20">
      <h2 className="text-center text-2xl md:text-4xl font-bold text-white mb-8">
        View rooms in Popular Cities
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-8">
        {cities.map((city, index) => (
          <button
            key={index}
            name="location"
            onClick={handleClick}
            value={city.name}
            className="
            relative
            h-40 md:h-64
            w-full
          
            rounded-lg overflow-hidden shadow-md
            cursor-pointer hover:scale-105 transition-transform
          "
          >
            <Image
              src={city.imgSrc}
              alt={city.name}
              fill
              // width={100}
              // height={100}
              className="object-cover"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {city.name.toUpperCase()}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default PopularCities;
