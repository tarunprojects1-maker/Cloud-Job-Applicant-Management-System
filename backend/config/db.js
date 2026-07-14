const mysql = require("mysql2/promise");
require("dotenv").config();

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("✅ MySQL Connected Successfully");
    await conn.end();
  } catch (err) {
    console.error("❌ MySQL Connection Failed");
    console.error(err);
  }
})();

module.exports = {};