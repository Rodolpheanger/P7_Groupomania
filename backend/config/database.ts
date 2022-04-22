import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const db = mysql.createConnection({
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
});

db.connect((err) => {
  if (err) {
    console.log("Connexion ko", err);
    return;
  }
  console.log(
    `⚡️[database]: Succefully connected to database: ${process.env.DB_NAME}`
  );
});
