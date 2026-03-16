import { Request, Response } from "express";
import {
  getAllUsersService,
  deleteUserService,
  getAllListingsService,
  deleteListingService,
  getAllTransactionsService,
} from "../services/admin.service";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 15;

    const { users, totalUsers, totalPages } = await getAllUsersService(
      page,
      limit,
    );

    return res.status(200).json({
      success: true,
      data: users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deletedUser = await deleteUserService(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 15;

    const { listings, totalListings, totalPages } = await getAllListingsService(
      page,
      limit,
    );

    return res.status(200).json({
      success: true,
      data: listings,
      pagination: {
        currentPage: page,
        totalPages,
        totalListings,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch listings",
    });
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const { listingId } = req.params;
    const deletedListing = await deleteListingService(listingId);

    if (!deletedListing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete listing",
    });
  }
};

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 15;

    const { transactions, totalTransactions, totalPages } =
      await getAllTransactionsService(page, limit);

    return res.status(200).json({
      success: true,
      data: transactions,
      pagination: {
        currentPage: page,
        totalPages,
        totalTransactions,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
};
