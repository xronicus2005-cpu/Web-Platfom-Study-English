import { db } from "../config/db.js";

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  login VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  gender ENUM('male','female') NOT NULL,
  who ENUM('student','teacher','pupil') NOT NULL,
  avatarIndex INT DEFAULT 0,  -- yangi ustun qo‘shildi
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`;

await db.execute(createTableQuery);

console.log("Users table created successfully.");
process.exit();