import express from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/users/me
router.get("/me", authMiddleware, getProfile);

// PUT /api/users/me
router.put("/me", authMiddleware, updateProfile);

export default router;
