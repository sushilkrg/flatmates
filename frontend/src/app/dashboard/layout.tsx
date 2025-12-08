"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      label: "My Listings",
      path: "/dashboard/my-listings",
      icon: (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      label: "Saved listings",
      path: "/dashboard/bookmarked-listings",
      icon: (
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
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      ),
    },
    {
      label: "Transaction History",
      path: "/dashboard/transaction-history",
      icon: (
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
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ];

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-300 hover:text-white transition"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-white">Dashboard</h1>
          <div className="w-6" /> {/* Spacer for centering */}
        </header>

        <div className="flex">
          {/* Sidebar Overlay (Mobile) */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeSidebar}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`
            fixed lg:sticky top-18 left-0 h-screen lg:h-screen
            w-72 lg:w-1/4 bg-gray-900 border-r border-gray-700
            z-50 lg:z-0
            transform transition-transform duration-300 ease-in-out
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
            overflow-y-auto
          `}
          >
            <div className="p-6">
              {/* Close button (Mobile only) */}
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-xl font-bold text-white">Menu</h2>
                <button
                  onClick={closeSidebar}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Desktop Title */}
              <h2 className="hidden lg:block text-xl font-bold text-white mb-6">
                Dashboard
              </h2>

              {/* Navigation */}
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={closeSidebar}
                      className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-gray-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }
                    `}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 lg:w-3/4 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
