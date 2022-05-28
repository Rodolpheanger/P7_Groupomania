import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
  getPostsByAuthor,
  updatePost,
} from "../controllers/posts.controllers";
import express from "express";
const router = express.Router();
import auth from "../middleware/auth.middleware";
import { uploadPostImage } from "../middleware/multer.middleware";
import { postValidation } from "../middleware/post-validation.middleware";

router.post("/new", auth, uploadPostImage, postValidation, createPost);
router.get("/posts", auth, getAllPosts);
router.get("/author", auth, postValidation, getPostsByAuthor);
router.get("/:id", auth, getOnePost);
router.put("/:id", auth, uploadPostImage, postValidation, updatePost);
router.delete("/:id", auth, deletePost);

export default router;
