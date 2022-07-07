import express from "express";
import { setLike, getLikeByPost } from "../controllers/likes.controllers";
const router = express.Router();
import auth from "../middleware/auth.middleware";
import { likeValidation } from "../middleware/like-validation.middleware";

router.get("/:id", auth, getLikeByPost);
router.post("/:id", auth, likeValidation, setLike);

export default router;
