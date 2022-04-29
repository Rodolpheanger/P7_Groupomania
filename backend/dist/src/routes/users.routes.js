"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const sign_controllers_1 = require("../controllers/sign.controllers");
const users_controllers_1 = require("../controllers/users.controllers");
// sign
router.post("/signup", sign_controllers_1.signup);
router.post("/login", sign_controllers_1.login);
// users
router.get("/users", users_controllers_1.getUsers);
router.get("/:username", users_controllers_1.getUser);
router.put("/:username", users_controllers_1.updateUser);
router.delete("/:username", users_controllers_1.deleteUser);
exports.default = router;
