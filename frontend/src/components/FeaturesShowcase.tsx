"use client";
import React from "react";
import { Check, X, Crown, Zap } from "lucide-react";

const FeaturedListingShowcase = () => {
  return (
    <section className="w-full py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-sm font-medium mb-6">
            <Crown className="w-4 h-4" />
            <span>Featured Listings</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get featured and find your flatmate 10x faster
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Free</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-slate-900">₹0</span>
                <span className="text-slate-600">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-slate-700">Basic listing</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-slate-700">Standard search results</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                <span className="text-slate-400">Featured badge</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                <span className="text-slate-400">Top ranking</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                <span className="text-slate-400">Priority support</span>
              </li>
            </ul>

            <button className="w-full py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors">
              Current Plan
            </button>
          </div>

          {/* Featured Plan */}
          <div className="bg-linear-to-br from-amber-50 to-orange-50 border-2 border-amber-400 rounded-2xl p-8 shadow-xl relative">
            {/* Badge */}
            <div className="absolute -top-3 right-8 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
              POPULAR
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-6 h-6 text-amber-600" />
                <h3 className="text-2xl font-bold text-slate-900">Featured</h3>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-bold text-slate-900">₹199</span>
                <span className="text-slate-600">/30 days</span>
              </div>
              <p className="text-sm text-slate-600">Just ₹6.6 per day</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <span className="text-slate-900 font-semibold">
                    Featured badge
                  </span>
                  <p className="text-sm text-slate-600">
                    Stand out with golden tag
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <span className="text-slate-900 font-semibold">
                    Top 3 ranking
                  </span>
                  <p className="text-sm text-slate-600">
                    Always on top of search
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <span className="text-slate-900 font-semibold">
                    10x more views
                  </span>
                  <p className="text-sm text-slate-600">
                    Guaranteed visibility
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <span className="text-slate-900 font-semibold">
                    5x responses
                  </span>
                  <p className="text-sm text-slate-600">Higher engagement</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <span className="text-slate-900 font-semibold">
                    Priority support
                  </span>
                  <p className="text-sm text-slate-600">24/7 assistance</p>
                </div>
              </li>
            </ul>

            <button className="w-full py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-lg hover:shadow-xl">
              Get Featured Now
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-4xl font-bold text-slate-900 mb-1">10x</p>
            <p className="text-sm text-slate-600">More Views</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-slate-900 mb-1">5x</p>
            <p className="text-sm text-slate-600">More Responses</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-slate-900 mb-1">3 Days</p>
            <p className="text-sm text-slate-600">Avg. Match</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingShowcase;
