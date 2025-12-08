import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    const isDev = process.env.NODE_ENV === "development";
    // const backendUrl = isDev
    //   ? "http://localhost:5000"  // Your local Express server
    //   : "https://flatmates-api.onrender.com"; // Production server

    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"}/api/v1/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
