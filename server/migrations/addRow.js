import { db } from "../config/db.js";

const addAvatarIndexColumn = `
ALTER TABLE users 
ADD COLUMN avatarIndex INT DEFAULT 0
`;

await db.execute(addAvatarIndexColumn);

console.log("avatarIndex column added successfully.");
process.exit();