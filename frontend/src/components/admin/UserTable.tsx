"use client";

import React, { useEffect, useState } from "react";
import UserRow from "./UserRow";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/utils/axiosClient";
import Pagination from "../Pagination";

interface UserData {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  myTransactions: any[];
}

interface IPagination {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalUsers: number;
  totalPages: number;
}

const UserTable = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [pagination, setPagination] = useState<IPagination>();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    const loadingToast = toast.loading("Deleting listing...");

    // Optimistically remove from UI immediately
    const previousListings = [...allUsers];
    setAllUsers((prev) => prev.filter((l: any) => l._id !== id));

    try {
      const res = await api.delete(`/admin/users/${id}`);

      toast.success(res.data.message || "User deleted successfully", {
        id: loadingToast,
        duration: 2000,
      });
    } catch (error: any) {
      console.error("Delete error:", error);

      // Revert the UI on error
      setAllUsers(previousListings);

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
    getAllUsers(currentPage);
  }, [currentPage]);

  const getAllUsers = async (page: number) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "15");
      const res = await api.get(`/admin/users?${params.toString()}`);

      if (!res) throw new Error("Request failed");

      setAllUsers(res?.data?.data);
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
    router.push(`/admin-panel/users?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!loading && allUsers.length === 0) {
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
        <h2 className="text-l font-bold text-white mb-2">No Users found</h2>
      </div>
    );
  }

  return (
    <div className="w-full md:w-full md:px-4 md:py-6">
      <div className="flex items-center justify-center mb-4">
        <div className="text-center mb-6">
          <h3 className="text-xl font-mono text-gray-300">
            Showing {allUsers.length} of {pagination?.totalUsers || 0} results
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Page {pagination?.currentPage || 1} of {pagination?.totalPages || 1}
          </p>
        </div>
      </div>

      {/* Main Container: Controls the scroll without breaking the parent layout */}
      <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allUsers.map((user: any) => (
                <UserRow
                  key={user?._id}
                  user={user}
                  onDelete={(id) => handleDelete(id)}
                />
              ))}
            </tbody>
          </table>
        </div>
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

export default UserTable;
