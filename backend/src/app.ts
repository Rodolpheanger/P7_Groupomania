import express, { Express, Request, Response } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "../config/database";
const userRoutes = require("./routes/users");
const port: string | undefined = process.env.PORT;

// **** Lancement du server ****
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Express + TypeScript Server is running");
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// ***************************************************************************

app.use(express.json());

// Mise en place des routes
app.use("/api/user", userRoutes);
