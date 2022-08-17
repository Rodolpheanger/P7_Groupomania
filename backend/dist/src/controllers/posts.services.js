"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceDeletePost = exports.serviceUpdatePost = exports.serviceGetOnePost = exports.serviceGetAllPosts = exports.serviceCreatePost = void 0;
const database_1 = require("../../config/database");
const posts_utils_1 = require("../utils/posts.utils");
const uploads_utils_1 = require("../utils/uploads.utils");
const user_role_utils_1 = require("../utils/user-role.utils");
const users_utils_1 = require("../utils/users.utils");
const serviceCreatePost = async (file, content, title, requestUserUid, protocol, host) => {
    const postImgUrl = (0, uploads_utils_1.createPostImgUrl)(file, protocol, host);
    const userDatas = await (0, users_utils_1.checkIfUserExistAndGetDatas)(file, requestUserUid);
    const userId = userDatas.u_id;
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO posts (p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_fk_user_id) VALUES (UUID(), ?, ?, NOW(), ?, ?)";
        const values = [content, postImgUrl, title, userId];
        database_1.db.execute(sql, values, (err) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(true);
        });
    });
};
exports.serviceCreatePost = serviceCreatePost;
const serviceGetAllPosts = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username, u_avatar_url,u_uid FROM posts INNER JOIN users ON p_fk_user_id =  u_id ORDER BY p_creation_date DESC`;
        database_1.db.query(sql, (err, rows) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
        });
    });
};
exports.serviceGetAllPosts = serviceGetAllPosts;
const serviceGetOnePost = (postUid) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = ?";
        const value = [postUid];
        database_1.db.execute(sql, value, (err, rows) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(rows[0]);
        });
    });
};
exports.serviceGetOnePost = serviceGetOnePost;
const serviceUpdatePost = async (file, postUid, content, title, post_image, requestUserUid, protocol, host) => {
    const datas = await (0, posts_utils_1.checkIfUserIsPostOwnerAndGetDatas)(file, postUid);
    const { postOwner, postId, postImgUrl } = datas;
    if (postOwner === requestUserUid) {
        const postImgUrlToSend = post_image
            ? post_image
            : post_image === "" && postImgUrl
                ? (0, uploads_utils_1.deleteOldPostImageOnServer)(postImgUrl)
                : (0, uploads_utils_1.setPostImgUrl)(file, protocol, host, postImgUrl);
        return new Promise((resolve, reject) => {
            const sql = "UPDATE posts SET p_content = ?, p_post_img_url = ?, p_title = ? WHERE p_id = ?";
            const values = [content, postImgUrlToSend, title, postId];
            database_1.db.execute(sql, values, (err) => {
                err ? (console.log(err), reject(Error("query error"))) : resolve(true);
            });
        });
    }
    else {
        if (file) {
            const filename = file.filename;
            (0, uploads_utils_1.deleteNewImageOnServer)(filename);
            throw Error("forbidden");
        }
        else {
            throw Error("forbidden");
        }
    }
};
exports.serviceUpdatePost = serviceUpdatePost;
const serviceDeletePost = async (file, postUid, requestUserUid) => {
    const datas = await (0, posts_utils_1.checkIfUserIsPostOwnerAndGetDatas)(file, postUid);
    const userRole = await (0, user_role_utils_1.checkUserRole)(requestUserUid);
    const { postOwner, postId, postImgUrl } = datas;
    if (postOwner === requestUserUid || userRole === "admin") {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM posts WHERE p_id = ?";
            const value = [postId];
            database_1.db.execute(sql, value, (err) => {
                err
                    ? (console.log(err), reject(Error("query error")))
                    : postImgUrl
                        ? ((0, uploads_utils_1.deleteOldPostImageOnServer)(postImgUrl), resolve(true))
                        : resolve(true);
            });
        });
    }
    else {
        throw Error("forbidden");
    }
};
exports.serviceDeletePost = serviceDeletePost;
//# sourceMappingURL=posts.services.js.map