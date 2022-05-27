import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsByPost,
  modifyComment,
} from "../controllers/comments.controllers";
const router = express.Router();
import auth from "../middleware/auth.middleware";
import { commentValidation } from "../middleware/comment-validation.middleware";

router.post("/new/:id", auth, commentValidation, createComment);
router.get("/:id", auth, getCommentsByPost);
router.put("/:id", auth, commentValidation, modifyComment);
router.delete("/:id", auth, deleteComment);

export default router;
