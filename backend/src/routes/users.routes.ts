import express from "express";
const router = express.Router();

import { signup, login } from "../controllers/auth.controllers";
import { getUsers } from "../controllers/users.controllers";

// auth
router.post("/signup", signup);
router.post("/login", login);

// users
router.get("/users", getUsers);

export default router;
