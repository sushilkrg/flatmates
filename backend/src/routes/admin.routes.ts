import express from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import {
  getAllUsers,
  deleteUser,
  getAllListings,
  deleteListing,
  getAllTransactions,
} from "../controllers/admin.controller";

const router = express.Router();
router.use(protectRoute, authorizeRoles("admin"));

router.get("/users", getAllUsers);
router.delete("/users/:userId", deleteUser);
router.get("/listings", getAllListings);
router.delete("/listings/:listingId", deleteListing);
router.get("/transactions", getAllTransactions);

export default router;
