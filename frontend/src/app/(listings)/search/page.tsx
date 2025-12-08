import { Suspense } from "react";
import ListingCardSkeleton from "@/components/ui/ListingCardShimmer";
import SearchContent from "@/components/SearchContent";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold text-white mb-8 mt-8">
            Loading...
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <ListingCardSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
