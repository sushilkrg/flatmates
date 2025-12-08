"use client";

import FiltersSidebar from "@/components/FiltersSidebar";
import { useRouter } from "next/navigation";

export default function FiltersPage() {
  const router = useRouter();
  return (
    <div className="p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 text-white underline flex items-center justify-center"
      >
        ← Back
      </button>
      <FiltersSidebar />
    </div>
  );
}
