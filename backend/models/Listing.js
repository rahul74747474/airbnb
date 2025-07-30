import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
     public_id: { type: String, required: true }, // Cloudinary public ID
     url: { type: String, required: true } // Cloudinary URL  
    },
    isBooked: { type: Boolean, default: false },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // ✅ NEW FIELD
  },
  { timestamps: true }
);


const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
