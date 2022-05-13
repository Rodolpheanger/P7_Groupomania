import express from "express";
const router = express.Router();
// import { getAllPosts } from "./../controllers/post.controllers";
import auth from "../middleware/auth.middleware";

// router.get("/posts", auth, getAllPosts);

export default router;
