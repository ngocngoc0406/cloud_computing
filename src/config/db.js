// 🔹 Gọi dotenv ngay trong module để đảm bảo env luôn có sẵn
import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise"; // ✅ Dùng bản Promise

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
});

// ✅ Test connection bằng Promise API
export const testConnection = async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ DB connected!");
    conn.release();
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
};
