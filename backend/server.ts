import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import mysql from "mysql2";

dotenv.config({ path: "./config/.env" });

const app: Express = express();
const port: string | undefined = process.env.PORT;
const test = "test3";

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const db = mysql.createConnection({
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
});

// db.connect((err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(
//     `⚡️[database]: Succefully connected to database: ${process.env.DB_NAME}`
//   );
//   db.query(
//     `INSERT INTO users (username, email) VALUES ("${test}", "jp2@pouet.fr");`,
//     (err, result) => {
//       if (err) throw err;
//       console.log(result);
//       console.log("test ok");
//     }
//   );
// });
