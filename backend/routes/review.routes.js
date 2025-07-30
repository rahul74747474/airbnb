import express from "express";
import {
  addReview,
  replyToReview,
  getReviewsByListing,
  deleteReview,
} from "../controllers/review.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/reviews         — create a review
router.post("/", authMiddleware, addReview);

// POST /api/reviews/:reviewId/reply   — reply to a review
router.post("/:reviewId/reply", authMiddleware, replyToReview);

// GET /api/reviews/listing/:listingId — get all reviews for a listing
router.get("/listing/:listingId", getReviewsByListing);

// DELETE /api/reviews/:reviewId — delete own review
router.delete("/:reviewId", authMiddleware, deleteReview);

export default router;
