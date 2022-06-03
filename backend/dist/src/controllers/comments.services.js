"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceDeleteComment = exports.serviceModifyComment = exports.serviceGetCommentsByPost = exports.serviceCreateComment = void 0;
const database_1 = require("../../config/database");
const comments_utils_1 = require("../utils/comments.utils");
const posts_utils_1 = require("../utils/posts.utils");
const user_role_utils_1 = require("../utils/user-role.utils");
const users_utils_1 = require("../utils/users.utils");
const serviceCreateComment = async (file, requestUserUid, content, postUid) => {
    const postDatas = await (0, posts_utils_1.checkIfPostExistAndGetDatas)(file, postUid);
    const postId = postDatas.p_id;
    const commentUserData = await (0, users_utils_1.checkIfUserExistAndGetDatas)(file, requestUserUid);
    const commentUserId = commentUserData.u_id;
    return new Promise((resolve, reject) => {
        const sqlCreateComment = `INSERT INTO comments (c_uid, c_content, c_fk_user_id, c_fk_post_id) VALUES (UUID(), '${content}',' ${commentUserId}', '${postId}')`;
        database_1.db.query(sqlCreateComment, (err) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(true);
        });
    });
};
exports.serviceCreateComment = serviceCreateComment;
const serviceGetCommentsByPost = async (file, postUid) => {
    const postDatas = await (0, posts_utils_1.checkIfPostExistAndGetDatas)(file, postUid);
    const postId = postDatas.p_id;
    return new Promise((resolve, reject) => {
        const sqlGetCommentsByPost = `SELECT c_uid, c_content, c_creation_date, c_modification_date, u_username FROM comments INNER JOIN users ON u_id = c_fk_user_id WHERE c_fk_post_id = '${postId}' ORDER BY c_creation_date`;
        database_1.db.query(sqlGetCommentsByPost, (err, rows) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
        });
    });
};
exports.serviceGetCommentsByPost = serviceGetCommentsByPost;
const serviceModifyComment = async (file, requestUserUid, commentUid, content) => {
    const datas = await (0, comments_utils_1.checkIfUserIsCommentOwnerAndGetDatas)(file, commentUid);
    const { commentId, commentOwner } = datas;
    if (commentOwner === requestUserUid) {
        return new Promise((resolve, reject) => {
            const sqlModifyComment = `UPDATE comments SET c_content = '${content}' WHERE c_id = ${commentId}`;
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
const serviceDeleteComment = async (file, requestUserUid, commentUid) => {
    const datas = await (0, comments_utils_1.checkIfUserIsCommentOwnerAndGetDatas)(file, commentUid);
    const userRole = await (0, user_role_utils_1.checkUserRole)(requestUserUid);
    const { commentId, commentOwner } = datas;
    if (commentOwner === requestUserUid || userRole === "admin") {
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