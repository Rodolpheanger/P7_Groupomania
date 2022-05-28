"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceSetLike = void 0;
const database_1 = require("../../config/database");
const likes_utils_1 = require("../utils/likes.utils");
const posts_utils_1 = require("../utils/posts.utils");
const users_utils_1 = require("../utils/users.utils");
const serviceSetLike = async (req) => {
    const userUid = req.userUid;
    const postUid = req.params.id;
    const likeValue = req.body.value;
    const postDatas = await (0, posts_utils_1.checkIfPostExistAndGetDatas)(req, postUid);
    const postId = postDatas.p_id;
    const likeUserData = await (0, users_utils_1.checkIfUserExistAndGetDatas)(req, userUid);
    const likeUserId = likeUserData.u_id;
    const likeDatas = await (0, likes_utils_1.checkIfLikeExistAndGetDatas)(req, postId, likeUserId);
    if (likeDatas === true) {
        serviceCreateLike(likeValue, likeUserId, postId);
    }
    else {
        const { likeId, oldLikeValue } = likeDatas;
        oldLikeValue === likeValue
            ? serviceDeleteLike(likeId)
            : serviceUpdateLike(likeId, likeValue);
    }
};
exports.serviceSetLike = serviceSetLike;
const serviceCreateLike = async (likeValue, likeUserId, postId) => {
    return new Promise((resolve, reject) => {
        const sqlCreateComment = `INSERT INTO likes (pl_value, pl_fk_user_id, pl_fk_post_id) VALUES (UUID(), '${likeValue}',' ${likeUserId}', '${postId}')`;
        database_1.db.query(sqlCreateComment, (err) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : resolve("like create");
        });
    });
};
const serviceUpdateLike = async (likeId, likeValue) => {
    return new Promise((resolve, reject) => {
        const sqlCreateComment = `UPDATE likes SET pl_value = '${likeValue}' WHERE pl_id = ${likeId})`;
        database_1.db.query(sqlCreateComment, (err) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : resolve("like update");
        });
    });
};
const serviceDeleteLike = async (likeId) => {
    return new Promise((resolve, reject) => {
        const sqlCreateComment = `DELETE likes WHERE pl_id = ${likeId})`;
        database_1.db.query(sqlCreateComment, (err) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : resolve("like delete");
        });
    });
};
//# sourceMappingURL=likes.services.js.map