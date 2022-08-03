"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLike = exports.getLikesByPost = void 0;
const errors_utils_1 = require("../utils/errors.utils");
const likes_services_1 = require("./likes.services");
const getLikesByPost = async (req, res) => {
    const file = req.file;
    const postUid = req.params.id;
    try {
        const result = await (0, likes_services_1.serviceGetLikesByPost)(file, postUid);
        res.status(200).json(result);
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.getLikesByPost = getLikesByPost;
const setLike = async (req, res) => {
    const file = req.file;
    const requestUserUid = req.requestUserUid;
    const postUid = req.params.id;
    const likeValue = req.body.value;
    try {
        const result = await (0, likes_services_1.serviceSetLike)(file, requestUserUid, postUid, likeValue);
        if (result)
            res.status(201).json({ message: result });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.setLike = setLike;
//# sourceMappingURL=likes.controllers.js.map