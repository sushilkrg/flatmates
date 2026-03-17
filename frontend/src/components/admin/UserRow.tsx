"use client";

import { Trash2 } from "lucide-react";

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  myTransactions: any[];
}

export default function UserRow({
  user,
  onDelete,
}: {
  user: User;
  onDelete: (id: string) => void;
}) {
  return (
    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
      {/* Logo, Name, and Email Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            {/* Placeholder for Logo - using initials if no image */}
            <span className="font-bold text-xs uppercase">
              {user.fullName.slice(0, 2)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">{user.fullName}</span>
            <span className="text-xs text-gray-400">{user.email}</span>
          </div>
        </div>
      </td>

      {/* Role Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {user.role}
        </span>
      </td>

      {/* Action Column */}
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button
          onClick={() => onDelete(user._id)}
          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 cursor-pointer rounded-lg transition-all"
          title="Delete User"

        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}

