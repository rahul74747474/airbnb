import express from "express";
import {
  createListing,
  getAllListings,
  getListingById,
  deleteListing,
  toggleReservation
} from "../controllers/listing.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/listings
router.get("/", getAllListings);

// GET /api/listings/:id
router.get("/:id", getListingById);

// POST /api/listings
console.log("route reached");
router.post("/", authMiddleware, createListing);

// DELETE /api/listings/:id
router.delete("/:id", authMiddleware, deleteListing);

router.put("/:id/toggle-reserve", authMiddleware, toggleReservation);

export default router;
