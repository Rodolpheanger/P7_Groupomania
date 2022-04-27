import express, { Express, Request, Response } from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
dotenv.config();
import "../config/database";
import userRoutes from "./routes/users.routes";
const port: string | undefined = process.env.PORT;

app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

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
