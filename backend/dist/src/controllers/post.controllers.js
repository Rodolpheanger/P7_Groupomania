"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsByAuthor = exports.getOnePost = exports.getAllPosts = exports.createPost = void 0;
const post_services_1 = require("./post.services");
const createPost = async (req, res) => {
    try {
        const result = await (0, post_services_1.serviceCreatePost)(req);
        result
            ? res.status(201).json({ message: "Post créé avec succès" })
            : res.status(400).json({ message: "Requête non conforme" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne serveur" });
    }
};
exports.createPost = createPost;
const getAllPosts = async (req, res) => {
    try {
        const data = await (0, post_services_1.serviceGetAllPosts)();
        data
            ? res.status(200).json(data)
            : res.status(400).json({ message: "Requête non conforme" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne serveur" });
    }
};
exports.getAllPosts = getAllPosts;
const getOnePost = async (req, res) => {
    try {
        const data = await (0, post_services_1.serviceGetOnePost)(req);
        data
            ? res.status(200).json({ data })
            : res.status(400).json({ message: "Requête non conforme" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne serveur" });
    }
};
exports.getOnePost = getOnePost;
const getPostsByAuthor = async (req, res) => {
    try {
        const data = await (0, post_services_1.serviceGetPostsByAuthor)(req);
        data
            ? res.status(200).json({ data })
            : res.status(400).json({ message: "Requête non conforme" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne serveur" });
    }
};
exports.getPostsByAuthor = getPostsByAuthor;
//# sourceMappingURL=post.controllers.js.map