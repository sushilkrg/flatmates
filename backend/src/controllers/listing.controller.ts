import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import Listing from "../models/Listing";
import User from "../models/User";

export const getListingDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listingId = id;

    const listingDetails = await Listing.findById(listingId);

    if (!listingDetails) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({ listingDetails });
  } catch (err) {
    console.error("Error in getListingDetails", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addListing = async (req: Request, res: Response) => {
  try {
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
    } = req.body;

    let { imageUrl } = req.body;

    const userId = (req as any).user?._id.toString();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
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
      return res.status(400).json({ error: "User must fill required data" });
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
      { $push: { myListings: newListing?._id } }
    );
    return res
      .status(200)
      .json({ newListing, message: "New Listing added successfully" });
  } catch (err) {
    console.error("Error");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const toggleBookmark = async (req: Request, res: Response) => {
  try {
    const { listingId } = req.params;
    const userId = (req as any).user?._id.toString();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isBookmarked = user.myBookmarkedListings?.includes(listingId as any);

    if (isBookmarked) {
      // remove
      user.myBookmarkedListings = user.myBookmarkedListings?.filter(
        (id) => id.toString() !== listingId
      );
    } else {
      //add
      user.myBookmarkedListings?.push(listingId as any);
    }

    await user.save();

    res.status(200).json({
      message: isBookmarked ? "Listing unbookmarked" : "Listing bookmarked",
      isBookmarked: !isBookmarked,
      bookmarkedListings: user.myBookmarkedListings,
    });
  } catch (err) {
    console.error("Error");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBookmarkedListings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?._id.toString();

    const user = await User.findById(userId).populate({
      path: "myBookmarkedListings",
      options: { sort: { createdAt: -1 } },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const bookmarkedListings = user?.myBookmarkedListings;
    if (bookmarkedListings?.length == 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(bookmarkedListings);
  } catch (err) {
    console.error("Error in getBookmarkedListings", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    if (listing?.postedBy.toString() != (req as any).user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You cannot delete other user listing" });
    }

    if (listing?.imageUrl) {
      const imageUrl: string = listing.imageUrl;
      const imgId = imageUrl.split("/").pop()?.split(".")[0];
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
      }
    }

    await User.updateOne(
      { _id: (req as any).user._id },
      { $pull: { myListings: listing?._id } }
    );

    await Listing.findByIdAndDelete(listingId);

    return res
      .status(200)
      .json({ listing, message: "Listing deleted successfully" });
  } catch (err) {
    console.error("Error in deleteListing", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMyListings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?._id.toString();
    const user = await User.findById(userId).populate({
      path: "myListings",
      options: { sort: { createdAt: -1 } },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const myListings = user?.myListings;
    if (myListings?.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(myListings);
  } catch (err) {
    console.error("Error in getMyListings", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFilteredListings = async (req: Request, res: Response) => {
  try {
    const {
      location,
      cityName,
      rent,
      accommodationType,
      lookingForGender,
      page: queryPage,
      limit: queryLimit,
    } = req.query;

    const page = parseInt(queryPage as string) || 1;
    const limit = parseInt(queryLimit as string) || 15;
    const skip = (page - 1) * limit;

    const filter: any = {};

    // Search location in both location and cityName fields
    // Split search term into words for better matching
    if (location) {
      const searchTerm = location as string;

      // Create regex that matches any word in the search term
      // For "new delhi" -> matches "new" OR "delhi" OR "new delhi"
      const words = searchTerm.trim().split(/\s+/); // Split by whitespace

      // Create individual word patterns
      const wordPatterns = words.map((word) => new RegExp(word, "i"));

      // Search in both location AND cityName fields
      filter.$or = [
        // Match any word in location, cityName field
        { location: { $in: wordPatterns } },
        { cityName: { $in: wordPatterns } },
        // Match complete phrase in location, cityName
        { location: { $regex: new RegExp(searchTerm, "i") } },
        { cityName: { $regex: new RegExp(searchTerm, "i") } },
      ];
    }

    // If separate cityName is provided (from dedicated cityName input)
    if (cityName) {
      const citySearchTerm = cityName as string;
      const cityWords = citySearchTerm.trim().split(/\s+/);
      const cityWordPatterns = cityWords.map((word) => new RegExp(word, "i"));

      // If location filter already exists, combine with AND logic
      if (filter.$or) {
        filter.$and = [
          { $or: filter.$or }, // Previous location search
          {
            $or: [
              { cityName: { $in: cityWordPatterns } },
              { cityName: { $regex: new RegExp(citySearchTerm, "i") } },
            ],
          },
        ];
        delete filter.$or;
      } else {
        // Only cityName search
        filter.$or = [
          { cityName: { $in: cityWordPatterns } },
          { cityName: { $regex: new RegExp(citySearchTerm, "i") } },
        ];
      }
    }

    // Rent filter
    if (rent) {
      const rentValue = Number(rent);
      if (!isNaN(rentValue)) {
        filter.rent = { $lte: rentValue };
      }
    }

    // Accommodation type filter
    if (accommodationType) {
      filter.accommodationType = accommodationType;
    }

    // Gender filter
    if (lookingForGender) {
      filter.lookingForGender = lookingForGender;
    }

    // Get total count for pagination
    const totalListings = await Listing.countDocuments(filter);

    // Use aggregation to efficiently sort featured first, then by date
    const listings = await Listing.aggregate([
      { $match: filter },
      {
        $addFields: {
          // Create a sort field: 0 for featured, 1 for non-featured
          sortOrder: { $cond: [{ $eq: ["$isFeatured", true] }, 0, 1] },
        },
      },
      {
        $sort: {
          sortOrder: 1, // Featured first (0 comes before 1)
          createdAt: -1, // Then by newest
        },
      },
      { $skip: skip },
      { $limit: limit },
      { $project: { sortOrder: 0 } }, // Remove temporary field from results
    ]);

    const totalPages = Math.ceil(totalListings / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return res.status(200).json({
      success: true,
      count: listings.length,
      pagination: {
        currentPage: page,
        totalPages,
        totalListings,
        limit,
        hasNextPage,
        hasPrevPage,
        nextPage: hasNextPage ? page + 1 : null,
        prevPage: hasPrevPage ? page - 1 : null,
      },
      results: listings,
    });
  } catch (err) {
    console.error("Error in getFilteredListings:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
