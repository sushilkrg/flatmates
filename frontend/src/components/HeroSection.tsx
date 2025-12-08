import React from "react";
import { Search, Users, Home, Shield, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-[93vh] overflow-hidden">
      {/* Elegant Background Gradient - Deep Navy to Teal */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-teal-900 to-emerald-900">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[32px_32px]"></div>

        {/* Elegant Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-teal-400/30 to-cyan-400/30 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-linear-to-r from-emerald-400/30 to-green-400/30 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-linear-to-r from-blue-400/30 to-teal-400/30 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>

        {/* Subtle Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[93vh] px-4 py-16">
        {/* Premium Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-teal-500/10 to-emerald-500/10 backdrop-blur-xl border border-teal-400/20 rounded-full text-teal-200 text-sm font-medium shadow-lg shadow-teal-500/10">
          <Sparkles className="w-4 h-4 text-teal-300" />
          <span className="bg-linear-to-r from-teal-200 to-emerald-200 bg-clip-text text-transparent font-semibold">
            Verified & Trusted Platform
          </span>
        </div>

        {/* Elegant Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-5xl leading-tight mb-6">
          <span className="text-white">Find Your Perfect</span>
          <span className="block mt-2 bg-linear-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(45,212,191,0.3)]">
            Flatmate or Roommate
          </span>
        </h1>

        {/* Refined Subheading */}
        <p className="text-lg md:text-xl text-slate-200 text-center max-w-2xl mb-12 leading-relaxed font-light">
          Connect with verified flatmates and roommates in your city.
          <span className="block mt-1 text-teal-200">
            Safe, simple, and tailored to your lifestyle.
          </span>
        </p>

        {/* Premium CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <button className="group relative px-8 py-4 bg-linear-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-2xl shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2">
              <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Start Searching
            </span>
          </button>
          <button className="px-8 py-4 bg-white/5 backdrop-blur-xl border-2 border-white/20 text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-teal-400/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            Post Your Listing
          </button>
        </div>

        {/* Elegant Stats Section */}
        <div className="grid grid-cols-3 gap-8 md:gap-20">
          <div className="text-center group cursor-default">
            <div className="flex items-center justify-center mb-3 p-3 bg-linear-to-br from-teal-500/10 to-emerald-500/10 rounded-2xl border border-teal-400/20 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
              <Users className="w-7 h-7 text-teal-300" />
            </div>
            <p className="text-4xl font-bold bg-linear-to-br from-white to-teal-200 bg-clip-text text-transparent mb-1">
              10K+
            </p>
            <p className="text-sm text-slate-300 font-light">Active Users</p>
          </div>

          <div className="text-center group cursor-default">
            <div className="flex items-center justify-center mb-3 p-3 bg-linear-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-400/20 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
              <Home className="w-7 h-7 text-emerald-300" />
            </div>
            <p className="text-4xl font-bold bg-linear-to-br from-white to-emerald-200 bg-clip-text text-transparent mb-1">
              5K+
            </p>
            <p className="text-sm text-slate-300 font-light">Listings</p>
          </div>

          <div className="text-center group cursor-default">
            <div className="flex items-center justify-center mb-3 p-3 bg-linear-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl border border-cyan-400/20 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-7 h-7 text-cyan-300" />
            </div>
            <p className="text-4xl font-bold bg-linear-to-br from-white to-cyan-200 bg-clip-text text-transparent mb-1">
              100%
            </p>
            <p className="text-sm text-slate-300 font-light">Verified</p>
          </div>
        </div>

        {/* Subtle Trust Indicators */}
        <div className="mt-16 flex items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></div>
            <span>Secure Platform</span>
          </div>
          <div className="w-px h-4 bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse animation-delay-1000"></div>
            <span>Free to Start</span>
          </div>
          <div className="w-px h-4 bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse animation-delay-2000"></div>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
