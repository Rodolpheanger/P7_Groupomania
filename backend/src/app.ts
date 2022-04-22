import express, { Express, Request, Response } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "../config/database";
import userRoutes from "./routes/users.routes";
const port: string | undefined = process.env.PORT;

app.use(express.json());

// Mise en place des routes
app.use("/api/user", userRoutes);

// **** Lancement du server ****
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Express + TypeScript Server is running");
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// ***************************************************************************
