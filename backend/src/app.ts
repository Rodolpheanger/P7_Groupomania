import { errorResponse } from "./utils/errors.utils";
import { QueryError } from "mysql2";
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import helmet from "helmet";
import path from "path";
import "../config/database";
import userRoutes from "./routes/users.routes";
import postRoutes from "./routes/posts.routes";
const app: Express = express();
const port = process.env.PORT;
const client = process.env.CLIENT_URL;

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
// **** Lancement du server ****
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Express + TypeScript Server is running");
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// ***************************************************************************

// Mise en place des middlewares pour servir les uploads

app.use("/avatars", express.static(path.join(__dirname, "avatars")));
app.use("/images", express.static(path.join(__dirname, "posts_images")));

// Mise en place des routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// Renvoi des erreurs non catchés vers errors.util
app.use(
  (err: QueryError | any, req: Request, res: Response, next: NextFunction) => {
    console.log("Error in app.ts : ", err);
    errorResponse(err, res);
  }
);
