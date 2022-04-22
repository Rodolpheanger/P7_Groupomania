import express from "express";
const router = express.Router();
import { getUsers, signIn } from "../controllers/users";

router.get("/users", getUsers);
router.post("/signin", signIn);

module.exports = router;
