"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPostImgUrl = exports.deleteNewImageOnServer = exports.deleteOldPostImageOnServer = exports.createPostImgUrl = exports.deleteAvatarImgOnServer = exports.deleteAvatarImgIfExist = exports.createAvatarUrl = void 0;
const fs = __importStar(require("fs"));
const createAvatarUrl = (file, protocol, host, avatarUrl) => {
    if (file) {
        return `${protocol}://${host}/avatar/${file.filename}`;
    }
    else {
        (0, exports.deleteAvatarImgIfExist)(file, avatarUrl);
        return "";
    }
};
exports.createAvatarUrl = createAvatarUrl;
const deleteAvatarImgIfExist = (file, avatarUrl) => {
    if (avatarUrl)
        (0, exports.deleteAvatarImgOnServer)(file, avatarUrl);
};
exports.deleteAvatarImgIfExist = deleteAvatarImgIfExist;
const getAvatarFilename = (file, avatarUrl) => {
    return file ? file.filename : avatarUrl.split("/avatar/")[1];
};
const deleteAvatarImgOnServer = (file, avatarUrl) => {
    const filename = getAvatarFilename(file, avatarUrl);
    fs.unlinkSync(`uploads/avatars/${filename}`);
};
exports.deleteAvatarImgOnServer = deleteAvatarImgOnServer;
const createPostImgUrl = (file, protocol, host) => {
    if (file) {
        return `${protocol}://${host}/post_image/${file.filename}`;
    }
    else {
        return "";
    }
};
exports.createPostImgUrl = createPostImgUrl;
const modifyPostImgUrl = (file, protocol, host) => {
    return `${protocol}://${host}/post_image/${file.filename}`;
};
const deleteOldPostImageOnServer = (oldPostImgUrl) => {
    const filename = oldPostImgUrl.split("/post_image/")[1];
    fs.unlinkSync(`uploads/posts_images/${filename}`);
    return "";
};
exports.deleteOldPostImageOnServer = deleteOldPostImageOnServer;
const deleteNewImageOnServer = (filename) => {
    fs.unlinkSync(`uploads/posts_images/${filename}`);
};
exports.deleteNewImageOnServer = deleteNewImageOnServer;
const setPostImgUrl = (file, protocol, host, postImgUrl) => {
    if (!file) {
        return postImgUrl;
    }
    else if (file && !postImgUrl) {
        const postImgUrlToSend = (0, exports.createPostImgUrl)(file, protocol, host);
        return postImgUrlToSend;
    }
    else {
        (0, exports.deleteOldPostImageOnServer)(postImgUrl);
        const postImgUrlToSend = modifyPostImgUrl(file, protocol, host);
        return postImgUrlToSend;
    }
};
exports.setPostImgUrl = setPostImgUrl;
//# sourceMappingURL=uploads.utils.js.map