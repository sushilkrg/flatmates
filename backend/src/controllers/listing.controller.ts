import { Request, Response } from "express";
import * as listingService from "../services/listing.service";

export const getListingDetails = async (req: Request, res: Response) => {
  try {
    const listing = await listingService.getListingDetailsService(
      req.params.id,
    );

    res.status(200).json({ listing });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const addListing = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id.toString();

    const newListing = await listingService.addListingService(req.body, userId);

    res.status(200).json({
      message: "New Listing added successfully",
      newListing,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleBookmark = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id.toString();

    const result = await listingService.toggleBookmarkService(
      req.params.listingId,
      userId,
    );

    res.status(200).json({
      message: result.isBookmarked
        ? "Listing bookmarked"
        : "Listing unbookmarked",
      ...result,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookmarkedListings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id.toString();

    const listings = await listingService.getBookmarkedListingsService(userId);

    res.status(200).json(listings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id.toString();

    const listing = await listingService.deleteListingService(
      req.params.id,
      userId,
    );

    res.status(200).json({
      message: "Listing deleted successfully",
      listing,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyListings = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id.toString();

    const listings = await listingService.getMyListingsService(userId);

    res.status(200).json(listings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getFilteredListings = async (req: Request, res: Response) => {
  try {
    const result = await listingService.getFilteredListingsService(req.query);

    res.status(200).json({
      success: true,
      count: result.listings.length,
      pagination: result.pagination,
      results: result.listings,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
