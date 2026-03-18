import {
  getListingDetailsService,
  addListingService,
  toggleBookmarkService,
  getBookmarkedListingsService,
  deleteListingService,
  getMyListingsService,
  getSearchedListingsService,
} from "../../services/listing.service";

import Listing from "../../models/Listing";
import User from "../../models/User";
import { redis } from "../../config/redis";
import { v2 as cloudinary } from "cloudinary";

jest.mock("../../models/Listing", () => {
  const mListing = {
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    countDocuments: jest.fn(),
    aggregate: jest.fn(),
  };

  return {
    __esModule: true,
    default: Object.assign(jest.fn(), mListing),
  };
});
jest.mock("../../models/User", () => {
  const mUser = {
    findById: jest.fn(),
    updateOne: jest.fn(),
  };

  return {
    __esModule: true,
    default: Object.assign(jest.fn(), mUser),
  };
});

jest.mock("../../config/redis", () => ({
  redis: {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    keys: jest.fn(),
  },
}));

jest.mock("cloudinary", () => ({
  v2: {
    uploader: {
      upload: jest.fn(),
      destroy: jest.fn(),
    },
  },
}));

describe("getListingDetailsService", () => {
  it("should return listing if found", async () => {
    //  MOCK REDIS
    (redis.keys as jest.Mock).mockResolvedValue([]);
    (redis.del as jest.Mock).mockResolvedValue(1);

    const mockListing = { _id: "1" };
    (redis.get as jest.Mock).mockResolvedValue(null); // no cache

    (Listing.findById as jest.Mock).mockResolvedValue(mockListing);

    const result = await getListingDetailsService("1");

    expect(redis.get).toHaveBeenCalled();
    expect(Listing.findById).toHaveBeenCalledWith("1");
    expect(result).toEqual(mockListing);
  });

  it("should throw error if not found", async () => {
    (Listing.findById as jest.Mock).mockResolvedValue(null);

    await expect(getListingDetailsService("1")).rejects.toThrow(
      "Listing not found",
    );
  });
});

describe("addListingService", () => {
  it("should create listing successfully", async () => {
    const mockUser = { _id: "user1" };

    (User.findById as jest.Mock).mockResolvedValue(mockUser);

    (cloudinary.uploader.upload as jest.Mock).mockResolvedValue({
      secure_url: "image-url",
    });

    const saveMock = jest.fn().mockResolvedValue(true);

    (Listing as unknown as jest.Mock).mockImplementation(() => ({
      save: saveMock,
      _id: "listing1",
    }));

    (User.updateOne as jest.Mock).mockResolvedValue({});

    const data = {
      postedByName: "test",
      location: "Delhi",
      cityName: "Delhi",
      rent: 1000,
      accommodationType: "flat",
      lookingForGender: "male",
      contactEmail: "test@test.com",
      imageUrl: "base64",
    };

    const result = await addListingService(data, "user1");

    expect(User.findById).toHaveBeenCalledWith("user1");
    expect(cloudinary.uploader.upload).toHaveBeenCalled();
    expect(saveMock).toHaveBeenCalled();
    expect(User.updateOne).toHaveBeenCalled();

    expect(result._id).toBe("listing1");
  });

  it("should throw error if user not found", async () => {
    (User.findById as jest.Mock).mockResolvedValue(null);

    await expect(addListingService({} as any, "user1")).rejects.toThrow(
      "User not found",
    );
  });
});

describe("toggleBookmarkService", () => {
  it("should add bookmark", async () => {
    const saveMock = jest.fn();

    const mockUser = {
      myBookmarkedListings: [],
      save: saveMock,
    };

    (User.findById as jest.Mock).mockResolvedValue(mockUser);

    const result = await toggleBookmarkService("listing1", "user1");

    expect(result.isBookmarked).toBe(true);
    expect(saveMock).toHaveBeenCalled();
  });

  it("should remove bookmark", async () => {
    const saveMock = jest.fn();

    const mockUser = {
      myBookmarkedListings: ["listing1"],
      save: saveMock,
    };

    (User.findById as jest.Mock).mockResolvedValue(mockUser);

    const result = await toggleBookmarkService("listing1", "user1");

    expect(result.isBookmarked).toBe(false);
  });
});

describe("getBookmarkedListingsService", () => {
  it("should return bookmarks", async () => {
    const mockUser = {
      myBookmarkedListings: [{ _id: "1" }],
    };

    (User.findById as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockUser),
    });

    const result = await getBookmarkedListingsService("user1");

    expect(result.length).toBe(1);
  });

  it("should throw error if user not found", async () => {
    (User.findById as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue(null),
    });

    await expect(getBookmarkedListingsService("user1")).rejects.toThrow(
      "User not found",
    );
  });
});

describe("deleteListingService", () => {
  it("should delete listing", async () => {
    const mockListing = {
      _id: "listing1",
      postedBy: "user1",
      imageUrl: "http://cloudinary.com/test.jpg",
    };

    (Listing.findById as jest.Mock).mockResolvedValue(mockListing);
    (Listing.findByIdAndDelete as jest.Mock).mockResolvedValue({});
    (User.updateOne as jest.Mock).mockResolvedValue({});
    (cloudinary.uploader.destroy as jest.Mock).mockResolvedValue({});

    const result = await deleteListingService("listing1", "user1");

    expect(result).toEqual(mockListing);
  });

  it("should throw unauthorized", async () => {
    const mockListing = {
      postedBy: "otherUser",
    };

    (Listing.findById as jest.Mock).mockResolvedValue(mockListing);

    await expect(deleteListingService("listing1", "user1")).rejects.toThrow(
      "Unauthorized",
    );
  });
});

describe("getMyListingsService", () => {
  it("should return user listings", async () => {
    const mockUser = {
      myListings: [{ _id: "1" }],
    };

    (User.findById as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockUser),
    });

    const result = await getMyListingsService("user1");

    expect(result.length).toBe(1);
  });
});

describe("getSearchedListingsService", () => {
  it("should return listings with pagination", async () => {
    (Listing.countDocuments as jest.Mock).mockResolvedValue(10);

    (Listing.aggregate as jest.Mock).mockResolvedValue([{ _id: "1" }]);

    const result = await getSearchedListingsService({
      page: "1",
      limit: "5",
    });

    expect(result.listings.length).toBe(1);
    expect(result.pagination.totalListings).toBe(10);
  });
});
