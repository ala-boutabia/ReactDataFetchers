import express from "express";
import {
  authUser,
  registerUser,
  LogoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userCtrl.js";

const router = express.Router();

// Create user
router.post("/", registerUser);
// Authentication/ Sign in
router.post("/auth", authUser);
// Logout
router.post("/logout", LogoutUser);
// Get/Update user profile
router.route("/profile").get(getUserProfile).put(updateUserProfile);

export default router;
