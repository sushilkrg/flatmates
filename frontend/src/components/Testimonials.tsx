"use client";

import { useEffect, useMemo, useState } from "react";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  message: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "Acme Corp",
    message:
      "Finding flatmates used to be a headache. This platform made it fast, transparent, and stress‑free.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Priya Verma",
    role: "Product Manager",
    company: "Startup Hub",
    message:
      "The filters and map view are super useful. I could shortlist rooms in my budget in minutes.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Aman Singh",
    role: "Data Analyst",
    company: "DataWorks",
    message:
      "Loved the clean UI and clear room details. Messaging owners felt safe and simple.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Neha Patel",
    role: "Designer",
    company: "Pixel Studio",
    message:
      "I moved to a new city and still found a great roommate before arriving. Huge time saver. lorem ipsum",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    name: "Karan Mehta",
    role: "Consultant",
    company: "BizLabs",
    message:
      "The verification badges and reviews gave me confidence while choosing a place to stay. lorem ipsum",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Marsh Mehta",
    role: "Consultant",
    company: "Sky sports",
    message:
      "The verification badges and reviews gave me confidence while choosing a place to stay. lorem ipsum",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
];

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <article className="flex h-full flex-col rounded-2xl border border-white/5 bg-gray-800/80 p-5 shadow-lg shadow-black/20 backdrop-blur-sm">
    <div className="flex items-center gap-3 mb-4">
      <img
        src={t.avatar}
        alt={t.name}
        className="h-12 w-12 rounded-full object-cover border border-white/10"
      />
      <div className="text-left">
        <p className="font-semibold text-white text-sm">{t.name}</p>
        <p className="text-xs text-gray-300">
          {t.role} · {t.company}
        </p>
      </div>
    </div>
    <p className="text-sm text-gray-100 leading-relaxed flex-1">
      “{t.message}”
    </p>
  </article>
);

const TestimonialSlider = () => {
  // Which breakpoint are we on?
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") {
        setIsDesktop(window.innerWidth >= 768); // md breakpoint
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Separate indices for mobile and desktop
  const [indexMobile, setIndexMobile] = useState(0);
  const [indexDesktop, setIndexDesktop] = useState(0);

  const mobileSlides = useMemo(() => chunkArray(testimonials, 1), []);
  const desktopSlides = useMemo(() => chunkArray(testimonials, 3), []);

  const totalSlidesMobile = mobileSlides.length;   // 5
  const totalSlidesDesktop = desktopSlides.length; // 2

  const nextMobile = () =>
    setIndexMobile((prev) => (prev + 1) % totalSlidesMobile);
  const prevMobile = () =>
    setIndexMobile((prev) => (prev - 1 + totalSlidesMobile) % totalSlidesMobile);

  const nextDesktop = () =>
    setIndexDesktop((prev) => (prev + 1) % totalSlidesDesktop);
  const prevDesktop = () =>
    setIndexDesktop(
      (prev) => (prev - 1 + totalSlidesDesktop) % totalSlidesDesktop
    );

  const currentMobile = mobileSlides[indexMobile] ?? [];
  const currentDesktop = desktopSlides[indexDesktop] ?? [];

  return (
    <section className="w-full bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Loved by renters & flatmates
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Real stories from people who found their perfect place.
            </p>
          </div>

          {/* Desktop arrows in header */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={prevDesktop}
              className="h-9 w-9 rounded-full border border-gray-600 text-gray-200 flex items-center justify-center hover:bg-gray-700 transition"
              aria-label="Previous testimonials"
            >
              ‹
            </button>
            <button
              onClick={nextDesktop}
              className="h-9 w-9 rounded-full border border-gray-600 text-gray-200 flex items-center justify-center hover:bg-gray-700 transition"
              aria-label="Next testimonials"
            >
              ›
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Mobile: 1 card per slide */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-4">
              {currentMobile.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </div>
          </div>

          {/* Desktop: 3 cards per slide */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentDesktop.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </div>
          </div>

          {/* Controls + dots */}
          <div className="mt-6 flex items-center justify-between md:justify-center md:gap-6">
            {/* Mobile arrows */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={prevMobile}
                className="h-9 w-9 rounded-full border border-gray-600 text-gray-200 flex items-center justify-center hover:bg-gray-700 transition"
                aria-label="Previous testimonials"
              >
                ‹
              </button>
              <button
                onClick={nextMobile}
                className="h-9 w-9 rounded-full border border-gray-600 text-gray-200 flex items-center justify-center hover:bg-gray-700 transition"
                aria-label="Next testimonials"
              >
                ›
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2 mx-auto">
              {/* Mobile dots */}
              <div className="flex md:hidden gap-2">
                {Array.from({ length: totalSlidesMobile }).map((_, i) => (
                  <button
                    key={`m-${i}`}
                    onClick={() => setIndexMobile(i)}
                    className={`h-2.5 rounded-full transition ${
                      i === indexMobile
                        ? "w-6 bg-blue-500"
                        : "w-2.5 bg-gray-600/60"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Desktop dots */}
              <div className="hidden md:flex gap-2">
                {Array.from({ length: totalSlidesDesktop }).map((_, i) => (
                  <button
                    key={`d-${i}`}
                    onClick={() => setIndexDesktop(i)}
                    className={`h-2.5 rounded-full transition ${
                      i === indexDesktop
                        ? "w-6 bg-blue-500"
                        : "w-2.5 bg-gray-600/60"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
