"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const posts_controllers_1 = require("../controllers/posts.controllers");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const multer_middleware_1 = require("../middleware/multer.middleware");
const post_validation_middleware_1 = require("../middleware/post-validation.middleware");
router.post("/", auth_middleware_1.default, multer_middleware_1.uploadPostImage, post_validation_middleware_1.postValidation, posts_controllers_1.createPost);
router.get("/", auth_middleware_1.default, posts_controllers_1.getAllPosts);
router.get("/author/:id", auth_middleware_1.default, post_validation_middleware_1.postValidation, posts_controllers_1.getPostsByAuthor);
router.get("/:id", auth_middleware_1.default, posts_controllers_1.getOnePost);
router.put("/:id", auth_middleware_1.default, multer_middleware_1.uploadPostImage, post_validation_middleware_1.postValidation, posts_controllers_1.updatePost);
router.delete("/:id", auth_middleware_1.default, posts_controllers_1.deletePost);
exports.default = router;
//# sourceMappingURL=posts.routes.js.map