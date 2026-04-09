import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await db.execute("SELECT id, name, lastName, login, gender, who, avatarIndex FROM users WHERE id = ?", [decoded.id]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    req.user = rows[0];
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};