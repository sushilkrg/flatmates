import { v2 as cloudinary } from "cloudinary";
import Listing from "../models/Listing";
import User from "../models/User";

export const getListingDetailsService = async (listingId: string) => {
  const listingDetails = await Listing.findById(listingId);

  if (!listingDetails) {
    throw new Error("Listing not found");
  }

  return listingDetails;
};

export const addListingService = async (data: any, userId: string) => {
  const {
    postedByName,
    location,
    cityName,
    rent,
    accommodationType,
    lookingForGender,
    contactNumber,
    contactEmail,
    facilities,
  } = data;

  let { imageUrl } = data;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (
    !postedByName ||
    !location ||
    !cityName ||
    !rent ||
    !accommodationType ||
    !lookingForGender ||
    !contactEmail
  ) {
    throw new Error("User must fill required data");
  }

  if (imageUrl) {
    const uploadedResponse = await cloudinary.uploader.upload(imageUrl);
    imageUrl = uploadedResponse.secure_url;
  }

  const newListing = new Listing({
    postedBy: userId,
    postedByName,
    location,
    cityName,
    rent,
    accommodationType,
    lookingForGender,
    imageUrl,
    isFeatured: false,
    contactNumber,
    contactEmail,
    facilities,
  });

  await newListing.save();

  await User.updateOne(
    { _id: userId },
    { $push: { myListings: newListing._id } },
  );

  return newListing;
};

export const toggleBookmarkService = async (
  listingId: string,
  userId: string,
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const isBookmarked = user.myBookmarkedListings?.includes(listingId as any);

  if (isBookmarked) {
    user.myBookmarkedListings = user.myBookmarkedListings?.filter(
      (id) => id.toString() !== listingId,
    );
  } else {
    user.myBookmarkedListings?.push(listingId as any);
  }

  await user.save();

  return {
    isBookmarked: !isBookmarked,
    bookmarkedListings: user.myBookmarkedListings,
  };
};

export const getBookmarkedListingsService = async (userId: string) => {
  const user = await User.findById(userId).populate({
    path: "myBookmarkedListings",
    options: { sort: { createdAt: -1 } },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.myBookmarkedListings || [];
};

export const deleteListingService = async (
  listingId: string,
  userId: string,
) => {
  const listing = await Listing.findById(listingId);

  if (!listing) {
    throw new Error("Listing not found");
  }

  if (listing.postedBy.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  if (listing.imageUrl) {
    const imgId = listing.imageUrl.split("/").pop()?.split(".")[0];

    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }
  }

  await User.updateOne({ _id: userId }, { $pull: { myListings: listing._id } });

  await Listing.findByIdAndDelete(listingId);

  return listing;
};

export const getMyListingsService = async (userId: string) => {
  const user = await User.findById(userId).populate({
    path: "myListings",
    options: { sort: { createdAt: -1 } },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.myListings || [];
};

export const getSearchedListingsService = async (query: any) => {
  const {
    location,
    cityName,
    rent,
    accommodationType,
    lookingForGender,
    page: queryPage,
    limit: queryLimit,
  } = query;

  const page = parseInt(queryPage) || 1;
  const limit = parseInt(queryLimit) || 15;
  const skip = (page - 1) * limit;

  const filter: any = {};

  if (location) {
    const searchTerm = location;
    const words = searchTerm.trim().split(/\s+/);
    const wordPatterns = words.map((word: string) => new RegExp(word, "i"));

    filter.$or = [
      { location: { $in: wordPatterns } },
      { cityName: { $in: wordPatterns } },
      { location: { $regex: new RegExp(searchTerm, "i") } },
      { cityName: { $regex: new RegExp(searchTerm, "i") } },
    ];
  }

  if (cityName) {
    const citySearchTerm = cityName;
    const cityWords = citySearchTerm.trim().split(/\s+/);
    const cityWordPatterns = cityWords.map(
      (word: string) => new RegExp(word, "i"),
    );

    if (filter.$or) {
      filter.$and = [
        { $or: filter.$or },
        {
          $or: [
            { cityName: { $in: cityWordPatterns } },
            { cityName: { $regex: new RegExp(citySearchTerm, "i") } },
          ],
        },
      ];
      delete filter.$or;
    } else {
      filter.$or = [
        { cityName: { $in: cityWordPatterns } },
        { cityName: { $regex: new RegExp(citySearchTerm, "i") } },
      ];
    }
  }

  if (rent) {
    const rentValue = Number(rent);
    if (!isNaN(rentValue)) {
      filter.rent = { $lte: rentValue };
    }
  }

  if (accommodationType) {
    filter.accommodationType = accommodationType;
  }

  if (lookingForGender) {
    filter.lookingForGender = lookingForGender;
  }

  const totalListings = await Listing.countDocuments(filter);

  const listings = await Listing.aggregate([
    { $match: filter },
    {
      $addFields: {
        sortOrder: { $cond: [{ $eq: ["$isFeatured", true] }, 0, 1] },
      },
    },
    {
      $sort: {
        sortOrder: 1,
        createdAt: -1,
      },
    },
    { $skip: skip },
    { $limit: limit },
    { $project: { sortOrder: 0 } },
  ]);

  const totalPages = Math.ceil(totalListings / limit);

  return {
    listings,
    pagination: {
      currentPage: page,
      totalPages,
      totalListings,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};
