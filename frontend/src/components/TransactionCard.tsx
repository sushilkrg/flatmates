"use client";

type Transaction = {
  _id: string;
  userId: string;
  listingId: string;
  amount: number;
  currency: string;
  status: "pending" | "success" | "failed" | "processing" | "canceled" | string;
  createdAt: string;
  updatedAt: string;
};

type TransactionCardProps = {
  transaction: Transaction;
};

const TransactionCard = ({ transaction }: TransactionCardProps) => {
    
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
      case "succeeded":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
      case "processing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "failed":
      case "canceled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
      case "succeeded":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "pending":
      case "processing":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "failed":
      case "canceled":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <article className="bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-4 md:p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-gray-600 m-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 truncate">Transaction ID</p>
              <p className="text-sm font-mono text-gray-200 truncate">
                {transaction?._id?.slice(0, 12)}...
              </p>
            </div>
          </div>
        </div>

        <span
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
            transaction.status
          )}`}
        >
          {getStatusIcon(transaction.status)}
          <span className="capitalize">{transaction.status}</span>
        </span>
      </div>

      {/* Amount Section */}
      <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-700/50">
        <p className="text-xs text-gray-400 mb-1">Amount</p>
        <p className="text-2xl md:text-3xl font-bold text-white">
          {transaction.currency === "INR" ? "₹" : transaction.currency}{" "}
          {transaction.amount.toLocaleString()}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
          <p className="text-xs text-gray-400 mb-1">Listing ID</p>
          <p className="text-xs font-mono text-gray-200 truncate">
            {transaction.listingId.slice(0, 12)}...
          </p>
        </div>

        <div className="bg-gray-900/30 rounded-lg p-3 border border-gray-700/30">
          <p className="text-xs text-gray-400 mb-1">User ID</p>
          <p className="text-xs font-mono text-gray-200 truncate">
            {transaction.userId.slice(0, 12)}...
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-gray-700/50">
        <p className="text-xs text-gray-400">Created</p>
        <p className="text-xs text-gray-300">
          {formatDate(transaction.createdAt)}
        </p>
      </div>
    </article>
  );
};

export default TransactionCard;
