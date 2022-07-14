"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPostImage = exports.uploadAvatar = void 0;
const multer_1 = __importDefault(require("multer"));
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Multer unexpected file"), false);
    }
};
const avatarStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/avatars");
    },
    filename: (req, file, cb) => {
        const name = req.requestUserUid;
        const extension = MIME_TYPES[file.mimetype];
        cb(null, `${name}_${Date.now()}.${extension}`);
    },
});
const postImageStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/posts_images");
    },
    filename: (req, file, cb) => {
        const name = req.requestUserUid;
        const extension = MIME_TYPES[file.mimetype];
        cb(null, `${name}_${Date.now()}.${extension}`);
    },
});
//@ts-ignore
exports.uploadAvatar = (0, multer_1.default)({
    limits: { fileSize: 1000000 },
    fileFilter,
    storage: avatarStorage,
}).single("avatar");
//@ts-ignore
exports.uploadPostImage = (0, multer_1.default)({
    limits: { fileSize: 2000000 },
    fileFilter,
    storage: postImageStorage,
}).single("post_image");
//# sourceMappingURL=multer.middleware.js.map