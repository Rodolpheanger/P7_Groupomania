"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceSetLike = exports.serviceGetLikeByPost = void 0;
const database_1 = require("../../config/database");
const likes_utils_1 = require("../utils/likes.utils");
const posts_utils_1 = require("../utils/posts.utils");
const users_utils_1 = require("../utils/users.utils");
const serviceGetLikeByPost = async (file, requestUserUid, postUid) => {
    const postDatas = await (0, posts_utils_1.checkIfPostExistAndGetDatas)(file, postUid);
    const postId = postDatas.p_id;
    // const userId = await checkIfUserExistAndGetDatas(file, requestUserUid)
    return new Promise((resolve, reject) => {
        const sqlGetLikeByPost = `SELECT pl_value, u_uid, pl_fk_post_id FROM posts_likes INNER JOIN users ON pl_fk_user_id = u_id WHERE pl_fk_post_id = '${postId}'`;
        database_1.db.query(sqlGetLikeByPost, (err, rows) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
        });
    });
};
exports.serviceGetLikeByPost = serviceGetLikeByPost;
const serviceSetLike = async (file, requestUserUid, postUid, likeValue) => {
    const postDatas = await (0, posts_utils_1.checkIfPostExistAndGetDatas)(file, postUid);
    const postId = postDatas.p_id;
    const likeUserData = await (0, users_utils_1.checkIfUserExistAndGetDatas)(file, requestUserUid);
    const likeUserId = likeUserData.u_id;
    const likeDatas = await (0, likes_utils_1.checkIfLikeExistAndGetDatas)(postId, likeUserId);
    if (likeDatas === false) {
        const result = await serviceCreateLike(likeValue, likeUserId, postId);
        return result;
    }
    else {
        const likeId = likeDatas.pl_id;
        const oldLikeValue = likeDatas.pl_value;
        return oldLikeValue === likeValue
            ? await serviceDeleteLike(likeId)
            : await serviceUpdateLike(likeId, likeValue);
    }
};
exports.serviceSetLike = serviceSetLike;
const serviceCreateLike = (likeValue, likeUserId, postId) => {
    return new Promise((resolve, reject) => {
        const sqlCreateComment = `INSERT INTO posts_likes (pl_value, pl_fk_user_id, pl_fk_post_id) VALUES ('${likeValue}',' ${likeUserId}', '${postId}')`;
        database_1.db.query(sqlCreateComment, (err) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : resolve("Like créé avec succès");
        });
    });
};
const serviceUpdateLike = (likeId, likeValue) => {
    return new Promise((resolve, reject) => {
        const sqlCreateComment = `UPDATE posts_likes SET pl_value = ${likeValue} WHERE pl_id = ${likeId}`;
        database_1.db.query(sqlCreateComment, (err) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : resolve("Like mise à jour avec succès");
        });
    });
};
const serviceDeleteLike = async (likeId) => {
    return new Promise((resolve, reject) => {
        const sqlCreateComment = `DELETE FROM posts_likes WHERE pl_id = ${likeId}`;
        database_1.db.query(sqlCreateComment, (err) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : resolve("Like supprimé avec succès");
        });
    });
};
//# sourceMappingURL=likes.services.js.map