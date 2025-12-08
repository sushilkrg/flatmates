import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4  ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Flatmates - All rights reserved.
        </div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="/" className="hover:text-white">
            About
          </Link>
          <Link href="/" className="hover:text-white">
            Help Center
          </Link>
          <Link href="/" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/" className="hover:text-white">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
