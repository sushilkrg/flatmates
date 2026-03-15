import express from "express";
import {
  addListing,
  toggleBookmark ,
  deleteListing,
  getBookmarkedListings,
  getFilteredListings,
  getListingDetails,
  getMyListings,
} from "../controllers/listing.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/details/:id", getListingDetails);
router.post("/add", protectRoute, addListing);
router.patch("/bookmark/:listingId", protectRoute, toggleBookmark );
router.get("/bookmarks", protectRoute, getBookmarkedListings);
router.delete("/:id", protectRoute, deleteListing);
router.get("/mylistings", protectRoute, getMyListings);
router.get("/filter", getFilteredListings);

export default router;
