import { createPost, getAllPosts } from "./../controllers/post.controllers";
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.middleware";

router.post("/new", auth, createPost);
router.get("/posts", auth, getAllPosts);

export default router;
