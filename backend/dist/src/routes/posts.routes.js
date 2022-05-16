"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_controllers_1 = require("./../controllers/post.controllers");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
router.post("/new", auth_middleware_1.default, post_controllers_1.createPost);
router.get("/posts", auth_middleware_1.default, post_controllers_1.getAllPosts);
exports.default = router;
//# sourceMappingURL=posts.routes.js.map