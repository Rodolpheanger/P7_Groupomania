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
import { uploadPostImage } from "../middleware/multer.middleware";

router.post("/new", auth, uploadPostImage, createPost);
router.get("/posts", auth, getAllPosts);
router.get("/author", auth, getPostsByAuthor);
router.get("/:id", auth, getOnePost);
router.put("/:id", auth, uploadPostImage, updatePost);
router.delete("/:id", auth, deletePost);

export default router;
