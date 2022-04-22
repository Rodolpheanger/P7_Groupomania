"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_controllers_1 = require("../controllers/auth.controllers");
const users_controllers_1 = require("../controllers/users.controllers");
// auth
router.post("/register", auth_controllers_1.signUp);
// users
router.get("/users", users_controllers_1.getUsers);
exports.default = router;
