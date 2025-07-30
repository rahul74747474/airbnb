// backend/seed/seedListings.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "./models/Listing.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/airbnb-clone";

const seedListings = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected ✅");

    const userId = "688920bac108422b39346e45"; // Your provided user ID

    const listings = [
      {
        user: userId,
        title: "Modern Apartment in City Center",
        description: "A stylish and comfortable apartment located in the heart of the city, close to all attractions.",
        price: 3500,
        image: "https://via.placeholder.com/800x400?text=Apartment+1",
        isBooked: false,
      },
      {
        user: userId,
        title: "Cozy Cottage in the Mountains",
        description: "A peaceful retreat in the mountains with breathtaking views and nature trails.",
        price: 2700,
        image: "https://via.placeholder.com/800x400?text=Cottage+2",
        isBooked: false,
      },
    ];

    await Listing.insertMany(listings);
    console.log("✅ Listings seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding listings:", err);
    process.exit(1);
  }
};

seedListings();

