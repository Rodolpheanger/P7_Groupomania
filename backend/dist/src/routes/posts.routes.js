"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_controllers_1 = require("./../controllers/post.controllers");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const multer_middleware_1 = require("../middleware/multer.middleware");
router.post("/new", auth_middleware_1.default, multer_middleware_1.uploadPostImage, post_controllers_1.createPost);
router.get("/posts", auth_middleware_1.default, post_controllers_1.getAllPosts);
router.get("/author", auth_middleware_1.default, post_controllers_1.getPostsByAuthor);
router.get("/:id", auth_middleware_1.default, post_controllers_1.getOnePost);
router.put("/:id", auth_middleware_1.default, multer_middleware_1.uploadPostImage, post_controllers_1.updatePost);
router.delete("/:id", auth_middleware_1.default, post_controllers_1.deletePost);
exports.default = router;
//# sourceMappingURL=posts.routes.js.map