"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.modifyComment = exports.getCommentsByPost = exports.createComment = void 0;
const errors_utils_1 = require("../utils/errors.utils");
const comments_services_1 = require("./comments.services");
const createComment = async (req, res) => {
    const file = req.file;
    const requestUserUid = req.requestUserUid;
    const content = req.body.content;
    const postUid = req.params.id;
    try {
        const result = await (0, comments_services_1.serviceCreateComment)(file, requestUserUid, content, postUid);
        if (result)
            res.status(201).json({ message: "Commentaire ajouté avec succès" });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.createComment = createComment;
const getCommentsByPost = async (req, res) => {
    const file = req.file;
    const postUid = req.params.id;
    try {
        const data = await (0, comments_services_1.serviceGetCommentsByPost)(file, postUid);
        if (data)
            res.status(200).json(data);
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.getCommentsByPost = getCommentsByPost;
const modifyComment = async (req, res) => {
    const file = req.file;
    const requestUserUid = req.requestUserUid;
    const commentUid = req.params.id;
    const content = req.body.content;
    try {
        const result = await (0, comments_services_1.serviceModifyComment)(file, requestUserUid, commentUid, content);
        if (result)
            res.status(200).json({ message: "Commentaire modifié avec succès" });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.modifyComment = modifyComment;
const deleteComment = async (req, res) => {
    const file = req.file;
    const requestUserUid = req.requestUserUid;
    const commentUid = req.params.id;
    try {
        const result = await (0, comments_services_1.serviceDeleteComment)(file, requestUserUid, commentUid);
        if (result)
            res.status(200).json({ message: "Commentaire supprimé avec succès" });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.deleteComment = deleteComment;
//# sourceMappingURL=comments.controllers.js.map