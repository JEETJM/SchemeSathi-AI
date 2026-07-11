import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  uploadProfileImage,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
const router = express.Router();

// Authentication
router.post("/register", register);
router.post("/login", login);

// User Profile
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put(
  "/profile/image",
  protect,
  upload.single("image"),
  uploadProfileImage,
);
export default router;
