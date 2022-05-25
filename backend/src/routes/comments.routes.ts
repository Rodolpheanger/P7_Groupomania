import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsByPost,
  modifyComment,
} from "../controllers/comments.controllers";
const router = express.Router();
import auth from "../middleware/auth.middleware";

router.post("/new/:id", auth, createComment);
router.get("/:id", auth, getCommentsByPost);
router.put("/:id", auth, modifyComment);
router.delete("/:id", auth, deleteComment);

export default router;
