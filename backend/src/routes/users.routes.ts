import express from "express";
const router = express.Router();

import { signUp } from "../controllers/auth.controllers";
import { getUsers } from "../controllers/users.controllers";

// auth
router.post("/register", signUp);

// users
router.get("/users", getUsers);

export default router;
