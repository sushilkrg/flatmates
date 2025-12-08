"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import api from "@/utils/axiosClient";

interface ListingForm {
  postedByName: string;
  location: string;
  cityName: string;
  rent: string;
  lookingForGender: string;
  accommodationType: string;
  contactNumber?: string;
  contactEmail: string;
  facilities: string;
}

const AddListingPage: React.FC = () => {
  const [formData, setFormData] = useState<ListingForm>({
    postedByName: "",
    location: "",
    cityName: "",
    rent: "",
    lookingForGender: "",
    accommodationType: "",
    contactNumber: "",
    contactEmail: "",
    facilities: "", 
  });

  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImage = imageUrl;

      // Convert comma-separated facilities to array
      const facilitiesArray = formData.facilities
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f !== "");

      const listingRes = await api.post(
        `/listing/add`,
        {
          postedByName: formData?.postedByName,
          location: formData?.location,
          cityName: formData?.cityName,
          rent: formData?.rent,
          lookingForGender: formData?.lookingForGender,
          accommodationType: formData?.accommodationType,
          contactNumber: formData?.contactNumber,
          contactEmail: formData?.contactEmail,
          facilities: facilitiesArray,
          imageUrl: uploadedImage,
          isFeatured: false,
        }
      );

      const listingId = listingRes.data.newListing._id;

      if (isFeatured) {
        const checkoutRes = await api.post(
          `/transaction/create-checkout-session`,
          {
            amount: 199,
            listingId,
          }
        );
        window.location.href = checkoutRes.data.url;
      } else {
        // for normal listing (not featured)
        toast.success("Listing created successfully!", {
          duration: 3000,
        });

        // Redirect to my listings after a short delay
        setTimeout(() => {
          router.push("/dashboard/my-listings");
        }, 1500);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Add New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Posted By Name *
          </label>
          <input
            name="postedByName"
            placeholder="Your name"
            value={formData.postedByName}
            onChange={handleChange}
            required
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Location *
          </label>
          <input
            name="location"
            placeholder="e.g., Sector 54"
            value={formData.location}
            onChange={handleChange}
            required
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            City Name *
          </label>
          <input
            name="cityName"
            placeholder="e.g., Delhi"
            value={formData.cityName}
            onChange={handleChange}
            required
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Looking For Gender *
          </label>
          <select
            name="lookingForGender"
            value={formData.lookingForGender}
            onChange={handleChange}
            required
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">Any</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Accommodation Type *
          </label>
          <select
            name="accommodationType"
            value={formData.accommodationType}
            onChange={handleChange}
            required
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Type</option>
            <option value="flatmate">Flatmate</option>
            <option value="roommate">Roommate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Rent (₹) *
          </label>
          <input
            name="rent"
            type="number"
            placeholder="e.g., 15000"
            min={0}
            value={formData.rent}
            onChange={handleChange}
            required
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Contact Number
          </label>
          <input
            name="contactNumber"
            placeholder="e.g., 9876543210"
            value={formData.contactNumber}
            onChange={handleChange}
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Contact Email *
          </label>
          <input
            name="contactEmail"
            type="email"
            placeholder="your@email.com"
            value={formData.contactEmail}
            onChange={handleChange}
            required
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Facilities
          </label>
          <input
            name="facilities"
            placeholder="e.g., gym, swimming pool, parking"
            value={formData.facilities}
            onChange={handleChange}
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate multiple facilities with commas
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imageUrl && (
            <p className="text-xs text-green-400 mt-1">Image selected ✓</p>
          )}
        </div>

        <div className="flex items-center gap-2 bg-gray-700/50 p-3 rounded">
          <input
            type="checkbox"
            id="featured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="featured" className="text-gray-300">
            Mark as Featured (₹199)
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-3 rounded-lg font-semibold transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Add Listing"}
        </button>
      </form>
    </div>
  );
};

export default AddListingPage;
