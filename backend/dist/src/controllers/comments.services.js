"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceDeleteComment = exports.serviceModifyComment = exports.serviceGetCommentsByPost = exports.serviceCreateComment = void 0;
const database_1 = require("../../config/database");
const comments_utils_1 = require("../utils/comments.utils");
const posts_utils_1 = require("../utils/posts.utils");
const users_utils_1 = require("../utils/users.utils");
const serviceCreateComment = async (req) => {
    const userUid = req.userUid;
    const content = req.body.content;
    const postUid = req.params.id;
    const postDatas = await (0, posts_utils_1.checkIfPostExistAndGetDatas)(req, postUid);
    const postId = postDatas.p_id;
    const commentUserData = await (0, users_utils_1.checkIfUserExistAndGetDatas)(req, userUid);
    const commentUserId = commentUserData.u_id;
    return new Promise((resolve, reject) => {
        const sqlCreateComment = `INSERT INTO comments (c_uid, c_content, c_fk_user_id, c_fk_post_id) VALUES (UUID(), '${content}',' ${commentUserId}', '${postId}')`;
        database_1.db.query(sqlCreateComment, (err) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(true);
        });
    });
};
exports.serviceCreateComment = serviceCreateComment;
const serviceGetCommentsByPost = async (req) => {
    const postUid = req.params.id;
    const postDatas = await (0, posts_utils_1.checkIfPostExistAndGetDatas)(req, postUid);
    const postId = postDatas.p_id;
    return new Promise((resolve, reject) => {
        const sqlGetCommentsByPost = `SELECT c_uid, c_content, c_creation_date, c_modification_date, u_username FROM comments INNER JOIN users ON u_id = c_fk_user_id WHERE c_fk_post_id = '${postId}' ORDER BY c_creation_date`;
        database_1.db.query(sqlGetCommentsByPost, (err, rows) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
        });
    });
};
exports.serviceGetCommentsByPost = serviceGetCommentsByPost;
const serviceModifyComment = async (req) => {
    const datas = await (0, comments_utils_1.checkIfUserIsCommentOwnerAndGetDatas)(req);
    const { commentId, commentOwner } = datas;
    if (commentOwner === req.userUid) {
        return new Promise((resolve, reject) => {
            const sqlModifyComment = `UPDATE comments SET c_content = '${req.body.content}' WHERE c_id = ${commentId}`;
            database_1.db.query(sqlModifyComment, (err) => {
                err ? (console.log(err), reject(Error("query error"))) : resolve(true);
            });
        });
    }
    else {
        throw Error("forbidden");
    }
};
exports.serviceModifyComment = serviceModifyComment;
const serviceDeleteComment = async (req) => {
    const datas = await (0, comments_utils_1.checkIfUserIsCommentOwnerAndGetDatas)(req);
    const { commentId, commentOwner } = datas;
    if (commentOwner === req.userUid) {
        return new Promise((resolve, reject) => {
            const sqlDeleteComment = `DELETE FROM comments WHERE c_id = ${commentId}`;
            database_1.db.query(sqlDeleteComment, (err) => {
                err ? (console.log(err), reject(Error("query error"))) : resolve(true);
            });
        });
    }
    else {
        throw Error("forbidden");
    }
};
exports.serviceDeleteComment = serviceDeleteComment;
//# sourceMappingURL=comments.services.js.map