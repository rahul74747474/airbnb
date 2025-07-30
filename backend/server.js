import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import listingRoutes from "./routes/listing.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


// Middleware
const allowedOrigins = [
  "https://airbnb-byj4.vercel.app", // ✅ production
  "https://airbnb-byj4-hgo9co486-rahul74747474s-projects.vercel.app", // ✅ preview deployment
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/reviews", reviewRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
