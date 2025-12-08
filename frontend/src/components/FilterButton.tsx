"use client";

import { useRouter } from "next/navigation";

export default function FilterButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/filters")}
      className="bg-gray-600 text-white px-4 py-2 rounded-full shadow-md flex gap-1 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
      </svg>
      Filter
    </button>
  );
}
