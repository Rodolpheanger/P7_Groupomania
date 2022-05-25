"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.modifyComment = exports.getCommentsByPost = exports.createComment = void 0;
const errors_utils_1 = require("../utils/errors.utils");
const comments_services_1 = require("./comments.services");
const createComment = async (req, res) => {
    try {
        const result = await (0, comments_services_1.serviceCreateComment)(req);
        if (result)
            res.status(201).json({ message: "Commentaire ajouté avec succès" });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.createComment = createComment;
const getCommentsByPost = async (req, res) => {
    try {
        const data = await (0, comments_services_1.serviceGetCommentsByPost)(req);
        if (data)
            res.status(200).json(data);
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.getCommentsByPost = getCommentsByPost;
const modifyComment = async (req, res) => {
    try {
        const result = await (0, comments_services_1.serviceModifyComment)(req);
        if (result)
            res.status(200).json({ message: "Commentaire modifié avec succès" });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.modifyComment = modifyComment;
const deleteComment = async (req, res) => {
    try {
        const result = await (0, comments_services_1.serviceDeleteComment)(req);
        if (result)
            res.status(200).json({ message: "Commentaire supprimé avec succès" });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.deleteComment = deleteComment;
//# sourceMappingURL=comments.controllers.js.map