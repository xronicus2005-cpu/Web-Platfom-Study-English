import express from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser, updateProfile } from "../controller/userController.js";
import { authMiddleware } from "../middlware/authMiddlware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, getCurrentUser);
router.post("/change-profile", authMiddleware, updateProfile)

export default router;