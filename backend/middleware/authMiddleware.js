import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    console.log("Auth Middleware Triggered");
    const token = req.cookies.token; // or from header if you use that

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    console.log("Decoded:", decoded);
console.log("User from DB:", user);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // 🔥 this is essential
    next();
    console.log("Middleware passed, user authenticated:", user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
