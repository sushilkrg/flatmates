"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/utils/axiosClient";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((store: RootState) => store.auth.user?.email);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    const loadingToast = toast.loading("Logging out...");

    try {
      const res = await api.post(
        `/auth/logout`,
        {},
        { withCredentials: true }
      );

      dispatch(clearUser());
      setDropdownOpen(false);
      setMenuOpen(false);

      toast.success("Logged out successfully", {
        id: loadingToast,
        duration: 2000,
      });

      router.push("/");
    } catch (error: any) {
      // console.error("Logout error:", error);
      toast.error("Failed to logout", {
        id: loadingToast,
        duration: 2000,
      });
    }
  }

  return (
    <>
      <nav className="p-4 shadow-lg sticky top-0 z-50 bg-white text-gray-800">
        <div className="container mx-auto px-4 md:px-16 flex justify-between items-center">
          <div>
            <Link
              href={user ? "/search" : "/"}
              className="text-3xl font-bold text-teal-900 hover:text-teal-800"
            >
              Flatmates
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 md:gap-12">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-xl font-semibold text-teal-900 hover:text-teal-800"
                >
                  Dashboard
                </Link>
                <Link
                  href="/add"
                  className="text-xl font-semibold text-teal-900 hover:text-teal-800"
                >
                  Add
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 bg-teal-900 text-white rounded-full px-4 py-2 hover:bg-teal-800 transition cursor-pointer"
                  >
                    <User size={20} />
                    <span className="font-semibold">{user?.split("@")[0]}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          router.push("/profile");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-100 transition cursor-pointer"
                      >
                        <User size={18} />
                        <span>Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          router.push("/settings");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-100 transition cursor-pointer"
                      >
                        <Settings size={18} />
                        <span>Settings</span>
                      </button>

                      <hr className="my-2 border-gray-200" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition cursor-pointer"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/search"
                  className="text-2xl font-bold text-teal-900 hover:text-teal-800"
                >
                  Search
                </Link>
                <Link href="/login">
                  <button className="border border-teal-950 bg-teal-900 text-white rounded-3xl px-4 py-2 font-bold hover:bg-teal-800 transition cursor-pointer">
                    Sign in
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-teal-900"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown - Now Absolute */}
        {menuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full flex flex-col items-start gap-4 py-4 px-4 bg-white shadow-lg z-40">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="text-teal-900 font-semibold"
                >
                  Dashboard
                </Link>
                <Link
                  href="/add"
                  onClick={() => setMenuOpen(false)}
                  className="text-teal-900 font-semibold"
                >
                  Add
                </Link>

                <hr className="w-full border-gray-300" />

                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-teal-900 font-semibold"
                >
                  <User size={18} />
                  Profile
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-teal-900 font-semibold"
                >
                  <Settings size={18} />
                  Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 border border-red-600 bg-red-600 text-white rounded-3xl px-4 py-2 font-bold hover:bg-red-700 transition cursor-pointer"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/search"
                  onClick={() => setMenuOpen(false)}
                  className="text-teal-900 font-semibold"
                >
                  Search
                </Link>
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <button className="border border-teal-950 bg-teal-900 text-white rounded-3xl px-4 py-2 font-bold hover:bg-teal-800 transition cursor-pointer">
                    Sign in
                  </button>
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Backdrop overlay for mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
