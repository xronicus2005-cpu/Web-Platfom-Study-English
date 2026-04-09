import express from "express";
import { getStatistics, saveResult, giveUserResults } from "../controller/statController.js";
import { authMiddleware } from "../middlware/authMiddlware.js";

const router = express.Router();

router.get("/getStat", getStatistics);
router.post("/results", authMiddleware, saveResult)
router.get("/my-results", authMiddleware, giveUserResults)

export default router;