"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostsByAuthor = exports.getOnePost = exports.getAllPosts = exports.createPost = void 0;
const errors_utils_1 = require("../utils/errors.utils");
const posts_services_1 = require("./posts.services");
const createPost = async (req, res) => {
    const file = req.file;
    const { content, title } = req.body;
    const requestUserUid = req.requestUserUid;
    const protocol = req.protocol;
    const host = req.get("host");
    try {
        if (req.headers["content-type"].includes("multipart") &&
            file === undefined) {
            throw Error("no file");
        }
        else {
            const result = await (0, posts_services_1.serviceCreatePost)(file, content, title, requestUserUid, protocol, host);
            if (result)
                res.status(201).json({ message: "Post créé avec succès" });
        }
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.createPost = createPost;
const getAllPosts = async (req, res) => {
    try {
        const data = await (0, posts_services_1.serviceGetAllPosts)();
        if (data)
            res.status(200).json(data);
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.getAllPosts = getAllPosts;
const getOnePost = async (req, res) => {
    const postUid = req.params.id;
    try {
        const data = await (0, posts_services_1.serviceGetOnePost)(postUid);
        if (data)
            res.status(200).json(data);
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.getOnePost = getOnePost;
const getPostsByAuthor = async (req, res) => {
    const authorUid = req.params.id;
    try {
        const data = await (0, posts_services_1.serviceGetPostsByAuthor)(authorUid);
        if (data)
            res.status(200).json(data);
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.getPostsByAuthor = getPostsByAuthor;
const updatePost = async (req, res) => {
    const file = req.file;
    const postUid = req.params.id;
    const { content, title, post_image, } = req.body;
    const requestUserUid = req.requestUserUid;
    const protocol = req.protocol;
    const host = req.get("host");
    try {
        if (req.headers["content-type"].includes("multipart") &&
            file === undefined) {
            throw Error("no file");
        }
        else {
            const result = await (0, posts_services_1.serviceUpdatePost)(file, postUid, content, title, post_image, requestUserUid, protocol, host);
            if (result)
                res.status(200).json({ message: "Post mis à jour avec succès" });
        }
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    const file = req.file;
    const postUid = req.params.id;
    const requestUserUid = req.requestUserUid;
    try {
        const result = await (0, posts_services_1.serviceDeletePost)(file, postUid, requestUserUid);
        if (result)
            res.status(200).json({ message: "Post supprimé avec succès" });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.deletePost = deletePost;
//# sourceMappingURL=posts.controllers.js.map