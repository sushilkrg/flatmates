import User from "../models/User";
import Listing from "../models/Listing";
import Transaction from "../models/Transaction";

export const getAllUsersService = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const users = await User.find()
    .select("-password -refreshToken")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalUsers = await User.countDocuments();
  const totalPages = Math.ceil(totalUsers / limit);

  return {
    users,
    totalUsers,
    totalPages,
  };
};

export const deleteUserService = async (userId: string) => {
  const deletedUser = await User.findByIdAndDelete(userId);
  return deletedUser;
};

export const getAllListingsService = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const listings = await Listing.find()
    .select("-password -refreshToken")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalListings = await Listing.countDocuments();
  const totalPages = Math.ceil(totalListings / limit);

  return {
    listings,
    totalListings,
    totalPages,
  };
};

export const deleteListingService = async (listingId: string) => {
  const deletedListing = await Listing.findByIdAndDelete(listingId);
  return deletedListing;
};

export const getAllTransactionsService = async (
  page: number,
  limit: number,
) => {
  const skip = (page - 1) * limit;

  const transactions = await Transaction.find()
    .skip(skip)
    .limit(limit)
    .populate("userId")
    .populate("listingId")
    .sort({ createdAt: -1 });

  const totalTransactions = await Transaction.countDocuments();
  const totalPages = Math.ceil(totalTransactions / limit);

  return {
    transactions,
    totalTransactions,
    totalPages,
  };
};
