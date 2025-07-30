import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    replies: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],

  },
  { timestamps: true }
);


const Review = mongoose.model("Review", reviewSchema);
export default Review;
