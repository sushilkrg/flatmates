const ListingCardSkeleton = () => (
  <div className="flex flex-col sm:flex-row bg-gray-800 border border-gray-700 rounded-md overflow-hidden shadow-lg mx-2 my-4 animate-pulse">
    <div className="w-full sm:w-96 h-48 sm:h-64 bg-gray-700" />
    <div className="flex flex-col justify-between p-7 flex-1 space-y-4">
      <div className="space-y-3">
        <div className="h-6 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-700 rounded w-1/2" />
        <div className="flex gap-2">
          <div className="h-8 bg-gray-700 rounded-full w-20" />
          <div className="h-8 bg-gray-700 rounded-full w-24" />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="h-10 bg-gray-700 rounded-lg flex-1" />
        <div className="h-10 bg-gray-700 rounded-lg flex-1" />
      </div>
    </div>
  </div>
);

export default ListingCardSkeleton;
