const TransactionCardSkeleton = () => (
  <div className="bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-4 md:p-5 shadow-lg animate-pulse mb-4">
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="flex items-center gap-2 flex-1">
        <div className="w-10 h-10 rounded-full bg-gray-700" />
        <div className="flex-1">
          <div className="h-3 bg-gray-700 rounded w-20 mb-2" />
          <div className="h-4 bg-gray-700 rounded w-32" />
        </div>
      </div>
      <div className="h-8 bg-gray-700 rounded-full w-24" />
    </div>

    <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-700/50">
      <div className="h-3 bg-gray-700 rounded w-16 mb-2" />
      <div className="h-8 bg-gray-700 rounded w-32" />
    </div>

    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
        <div className="h-3 bg-gray-700 rounded w-16 mb-2" />
        <div className="h-3 bg-gray-700 rounded w-20" />
      </div>
      <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
        <div className="h-3 bg-gray-700 rounded w-16 mb-2" />
        <div className="h-3 bg-gray-700 rounded w-20" />
      </div>
    </div>

    <div className="pt-3 border-t border-gray-700/50">
      <div className="h-3 bg-gray-700 rounded w-24 mb-1" />
      <div className="h-3 bg-gray-700 rounded w-40" />
    </div>
  </div>
);

export default TransactionCardSkeleton;
