import { db } from "../config/db.js"; // MySQL connection

export const getStatistics = async (req, res) => {
  try {
    // Umumiy foydalanuvchilar soni
    const [totalUsersResult] = await db.execute(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );
    const totalUsers = totalUsersResult[0].totalUsers || 0;

    // Bu hafta qo'shilgan foydalanuvchilar soni
    const [weeklyUsersResult] = await db.execute(
      `SELECT COUNT(*) AS weeklyUsers 
       FROM users 
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`
    );
    const weeklyUsers = weeklyUsersResult[0].weeklyUsers || 0;

    res.status(200).json({ totalUsers, weeklyUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};



// controllers/resultController.js

export const saveResult = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { test_title, score, band } = req.body;

    if (!test_title || score === undefined || band === undefined) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await db.execute(
      `INSERT INTO results (user_id, test_title, score, band)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       score = VALUES(score),
       band = VALUES(band),
       updated_at = CURRENT_TIMESTAMP`,
      [user_id, test_title, score, band]
    );

    res.status(200).json({ message: "Result saved/updated", success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const giveUserResults = async (req, res) => { 
  try { 
    const [rows] = await db.execute( "SELECT test_title, score, band FROM results WHERE user_id = ?", [req.user.id] ); 
    
    // 🔹 to‘g‘ridan-to‘g‘ri yuboramiz 
    const results = rows.map(row => ({ 
      code: row.test_title, // E11T1 
      score: `${row.score}/40`, 
      band: row.band 
    })); 
    
    res.json({ results }); 
  } 
  
  catch (err) { 
    console.error(err); 
    res.status(500).json({ message: "Server error" }); 
  } 
};