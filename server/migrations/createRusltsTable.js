import { db } from "../config/db.js";

const createResultsTable = `
CREATE TABLE IF NOT EXISTS results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  test_title VARCHAR(255) NOT NULL,
  score INT NOT NULL,
  band DECIMAL(3,1) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY unique_user_test (user_id, test_title),

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
`;

await db.execute(createResultsTable);

console.log("Results table created successfully.");
process.exit();