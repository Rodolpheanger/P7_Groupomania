import express from "express";
import { setLike, getLikesByPost } from "../controllers/likes.controllers";
const router = express.Router();
import auth from "../middleware/auth.middleware";
import { likeValidation } from "../middleware/like-validation.middleware";

router.get("/:id", auth, getLikesByPost);
router.post("/:id", auth, likeValidation, setLike);

export default router;
