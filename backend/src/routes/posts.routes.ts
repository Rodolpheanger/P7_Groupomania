import {
  createPost,
  getAllPosts,
  getOnePost,
  getPostsByAuthor,
} from "./../controllers/post.controllers";
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.middleware";

router.post("/new", auth, createPost);
router.get("/posts", auth, getAllPosts);
router.get("/author", auth, getPostsByAuthor);
router.get("/:id", auth, getOnePost);

export default router;
