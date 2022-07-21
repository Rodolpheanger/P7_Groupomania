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
        const sql = "INSERT INTO comments (c_uid, c_content, c_fk_user_id, c_fk_post_id) VALUES (UUID(), ?, ?, ?)";
        const values = [content, commentUserId, postId];
        database_1.db.execute(sql, values, (err) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(true);
        });
    });
};
exports.serviceCreateComment = serviceCreateComment;
const serviceGetCommentsByPost = async (file, postUid) => {
    const postDatas = await (0, posts_utils_1.checkIfPostExistAndGetDatas)(file, postUid);
    const postId = postDatas.p_id;
    return new Promise((resolve, reject) => {
        const sql = "SELECT c_uid, c_content, c_creation_date, c_modification_date, u_username, u_uid, u_avatar_url FROM comments INNER JOIN users ON u_id = c_fk_user_id WHERE c_fk_post_id = ? ORDER BY c_creation_date";
        const value = [postId];
        database_1.db.execute(sql, value, (err, rows) => {
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
            const sql = "UPDATE comments SET c_content = ? WHERE c_id = ?";
            const values = [content, commentId];
            database_1.db.execute(sql, values, (err) => {
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
            const sql = "DELETE FROM comments WHERE c_id = ?";
            const value = [commentId];
            database_1.db.execute(sql, value, (err) => {
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