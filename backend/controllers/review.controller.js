import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const { listingId, content } = req.body;

    const review = await Review.create({
      listing: listingId,
      user: req.user._id,
      content,
    });

    const populatedReview = await Review.findById(review._id).populate("user", "name");

    res.status(201).json(populatedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const replyToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { content } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.replies.push({
      user: req.user._id,
      content,
      createdAt: new Date(),
    });

    await review.save();

    const populated = await Review.findById(reviewId)
      .populate("user", "name")
      .populate("replies.user", "name");

    res.json({ message: "Reply added", review: populated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getReviewsByListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const reviews = await Review.find({ listing: listingId })
      .populate("user", "name")
      .populate("replies.user", "name");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
