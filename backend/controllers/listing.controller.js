// import cloudinary from "../config/cloudinary.js"; // Update this import if needed
import Listing from "../models/Listing.js";
import { v2 as cloudinary } from 'cloudinary';

export const createListing = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ errors: "No image uploaded" });
    }

    const image = req.files.image;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(image.mimetype)) {
      return res.status(400).json({ errors: "Invalid file type. Only JPG, PNG, and WEBP are allowed." });
    }

    const result = await cloudinary.uploader.upload(image.tempFilePath);

    const listing = await Listing.create({
      user: req.user._id, // This requires your auth middleware to populate req.user
      title,
      description,
      price,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).json(listing);
  } catch (err) {
    console.error("Create Listing Error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate("user", "name email");
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getListingById = async (req, res) => {
  try {
    // GET /listings/:id
const listing = await Listing.findById(req.params.id).populate("user", "name");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const toggleReservation = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    const userId = req.user._id.toString();

    if (!listing.isBooked) {
      // Reserve it
      listing.isBooked = true;
      listing.bookedBy = userId;
    } else if (listing.bookedBy?.toString() === userId) {
      // Unreserve it
      listing.isBooked = false;
      listing.bookedBy = null;
    } else {
      // Someone else booked
      return res.status(403).json({ message: "Listing already reserved by another user" });
    }

    await listing.save();
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await listing.deleteOne();
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
