"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceDeletePost = exports.serviceUpdatePost = exports.serviceGetPostsByAuthor = exports.serviceGetOnePost = exports.serviceGetAllPosts = exports.serviceCreatePost = void 0;
const database_1 = require("../../config/database");
const post_utils_1 = require("../utils/post.utils");
const uploads_utils_1 = require("../utils/uploads.utils");
const user_utils_1 = require("../utils/user.utils");
const serviceCreatePost = async (req) => {
    const { content, title } = req.body;
    const postImgUrl = (0, uploads_utils_1.createPostImgUrl)(req);
    const userId = await (0, user_utils_1.getUserId)(req);
    return new Promise((resolve, reject) => {
        const reqCreatePost = `INSERT INTO posts (p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, p_fk_user_id) VALUES (UUID(), "${content}", "${postImgUrl}", NOW(), "${title}", NULL, "${userId}") `;
        database_1.db.query(reqCreatePost, (err) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(true);
        });
    });
};
exports.serviceCreatePost = serviceCreatePost;
const serviceGetAllPosts = () => {
    return new Promise((resolve, reject) => {
        const reqGetAllPosts = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM posts INNER JOIN users ON p_fk_user_id =  u_id`;
        database_1.db.query(reqGetAllPosts, (err, rows) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
        });
    });
};
exports.serviceGetAllPosts = serviceGetAllPosts;
const serviceGetOnePost = (req) => {
    return new Promise((resolve, reject) => {
        const reqGetOnePost = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = "${req.params.id}"`;
        database_1.db.query(reqGetOnePost, (err, rows) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(rows[0]);
        });
    });
};
exports.serviceGetOnePost = serviceGetOnePost;
const serviceGetPostsByAuthor = (req) => {
    return new Promise((resolve, reject) => {
        const reqGetPostsByAuthor = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM users INNER JOIN posts ON u_id = p_fk_user_id WHERE u_uid = "${req.body.author}"`;
        database_1.db.query(reqGetPostsByAuthor, (err, rows) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
        });
    });
};
exports.serviceGetPostsByAuthor = serviceGetPostsByAuthor;
const serviceUpdatePost = async (req) => {
    const postId = req.params.id;
    const { content, title } = req.body;
    const postDatas = await (0, post_utils_1.checkIfPostExistAndGetDatas)(postId);
    const postOwner = postDatas.u_uid;
    const oldPostImgUrl = postDatas.p_post_img_url;
    const postImgUrl = (0, uploads_utils_1.setPostImgUrl)(req, oldPostImgUrl);
    if (postOwner === req.userUid) {
        return new Promise((resolve, reject) => {
            const reqUpdatePost = `UPDATE posts SET p_content = '${content}', p_post_img_url = '${postImgUrl}',p_title = '${title}' WHERE p_uid = '${postId}'`;
            database_1.db.query(reqUpdatePost, (err) => {
                err ? (console.log(err), reject(Error("query error"))) : resolve(true);
            });
        });
    }
    else {
        throw Error("forbidden");
    }
};
exports.serviceUpdatePost = serviceUpdatePost;
const serviceDeletePost = async (req) => {
    const postId = req.params.id;
    const postDatas = await (0, post_utils_1.checkIfPostExistAndGetDatas)(postId);
    const postOwner = postDatas.u_uid;
    const postImgUrl = postDatas.p_post_img_url;
    if (postOwner === req.userUid) {
        return new Promise((resolve, reject) => {
            (0, uploads_utils_1.deleteOldPostImageOnServer)(postImgUrl);
            const reqDeletePost = `DELETE FROM posts WHERE p_uid = '${postId}'`;
            database_1.db.query(reqDeletePost, (err) => {
                err ? (console.log(err), reject(Error("query error"))) : resolve(true);
            });
        });
    }
    else {
        throw Error("forbidden");
    }
};
exports.serviceDeletePost = serviceDeletePost;
//# sourceMappingURL=post.services.js.map