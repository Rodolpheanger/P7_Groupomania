import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
  getPostsByAuthor,
  updatePost,
} from "./../controllers/post.controllers";
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.middleware";

router.post("/new", auth, createPost);
router.get("/posts", auth, getAllPosts);
router.get("/author", auth, getPostsByAuthor);
router.get("/:id", auth, getOnePost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

export default router;
