import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import helmet from "helmet";
import "../config/database";
import { errorResponse } from "./utils/errors.utils";
import { QueryError } from "mysql2";
import userRoutes from "./routes/users.routes";
import postRoutes from "./routes/posts.routes";
import commentRoutes from "./routes/comments.routes";
import likeRoutes from "./routes/likes.routes";

const app: Express = express();

const port = process.env.PORT;
const client = process.env.CLIENT_URL;

app.use(express.json());

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

app.use(
  cors({
    origin: client,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// * Lancement du server *
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Express + TypeScript Server is running");
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// * Définition des "chemins statics" des dossiers recevants les avatars et les images *
app.use("/avatar", express.static("uploads/avatars"));
app.use("/post_image", express.static("uploads/posts_images"));

// * Mise en place des routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

// * Renvoi des erreurs "non catchés" vers errors.util
app.use(
  (err: QueryError | any, req: Request, res: Response, next: NextFunction) => {
    console.log("Error in app.ts : ", err);
    errorResponse(err, res);
  }
);
