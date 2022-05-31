"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLike = void 0;
const errors_utils_1 = require("../utils/errors.utils");
const likes_services_1 = require("./likes.services");
const setLike = async (req, res) => {
    const file = req.file;
    const userUid = req.userUid;
    const postUid = req.params.id;
    const likeValue = req.body.value;
    try {
        const result = await (0, likes_services_1.serviceSetLike)(file, userUid, postUid, likeValue);
        if (result)
            res.status(201).json({ message: result });
    }
    catch (err) {
        console.log("test", err);
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.setLike = setLike;
//# sourceMappingURL=likes.controllers.js.map