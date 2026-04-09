import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, lastName, login, password, gender, who } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      "INSERT INTO users (name, lastname, login, password, gender, who) VALUES (?, ?, ?, ?, ?, ?)",
      [name, lastName, login, hashedPassword, gender, who]
    );

    const userId = result.insertId;
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Cookie set qilish
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // production uchun true, local development uchun false bo‘lishi mumkin
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      user: { id: userId, name, lastName, login, gender, who },
    });
  } catch (error) {
    console.error(error);
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ success: false, message: "Login already exists" });
    } else {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    const [rows] = await db.execute("SELECT * FROM users WHERE login = ?", [login]);
    if (rows.length === 0) return res.status(400).json({ message: "Invalid credentials" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastname,
        login: user.login,
        gender: user.gender,
        who: user.who,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT
export const logoutUser = async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.json({ success: true });
};

// GET CURRENT USER
export const getCurrentUser = async (req, res) => {
  res.json({ user: req.user });
};

// User profile update (password, personal info, avatarIndex)
export const updateProfile = async (req, res) => {
  try {
    const { name, lastName, login, currentPassword, newPassword, gender, who, avatarIndex } = req.body;
    const userId = req.user.id;

    // 1. Passwordni yangilash kerak bo‘lsa
    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ message: "Current password is required." });

      const [userRows] = await db.execute("SELECT password FROM users WHERE id = ?", [userId]);
      if (userRows.length === 0) return res.status(404).json({ message: "User not found." });

      const passwordMatch = await bcrypt.compare(currentPassword, userRows[0].password);
      if (!passwordMatch) return res.status(400).json({ message: "Current password is incorrect." });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.execute("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]);
    }

    // 2. Boshqa ma'lumotlarni yangilash
    await db.execute(
      "UPDATE users SET name = ?, lastName = ?, login = ?, gender = ?, who = ?, avatarIndex = ? WHERE id = ?",
      [name, lastName, login, gender, who, avatarIndex || 0, userId]
    );

    res.status(200).json({ success: true, message: "Profile updated." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};