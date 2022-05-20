"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostsByAuthor = exports.getOnePost = exports.getAllPosts = exports.createPost = void 0;
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
        res.status(500).json({ message: "Test Erreur interne serveur" });
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
const updatePost = async (req, res) => {
    try {
        const result = await (0, post_services_1.serviceUpdatePost)(req);
        result === "Forbidden"
            ? res.status(403).json({ message: "Requête non autorisée" })
            : result
                ? res.status(200).json({ message: "Post mis à jour avec succès" })
                : res.status(404).json({ message: "Post non trouvé" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne serveur" });
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        const result = await (0, post_services_1.serviceDeletePost)(req);
        result === "Forbidden"
            ? res.status(403).json({ message: "Requête non autorisée" })
            : result
                ? res.status(200).json({ message: "Post supprimé avec succès" })
                : res.status(404).json({ message: "Post non trouvé" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne serveur" });
    }
};
exports.deletePost = deletePost;
//# sourceMappingURL=post.controllers.js.map