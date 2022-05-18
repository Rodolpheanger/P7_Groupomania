import express, { Express, Request, Response } from "express";
const app: Express = express();
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
dotenv.config();
import "../config/database";
import userRoutes from "./routes/users.routes";
import postRoutes from "./routes/posts.routes";
const port = process.env.PORT;
const client = process.env.CLIENT_URL;
console.log(client);

app.use(express.json());
app.use(helmet());

app.use(
  cors({
    origin: client,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Mise en place des routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
// **** Lancement du server ****
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Express + TypeScript Server is running");
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// ***************************************************************************
