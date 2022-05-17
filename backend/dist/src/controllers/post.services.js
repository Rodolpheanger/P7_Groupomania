"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceGetPostsByAuthor = exports.serviceGetOnePost = exports.serviceGetAllPosts = exports.serviceCreatePost = void 0;
const database_1 = require("../../config/database");
const user_utils_1 = require("../utils/user.utils");
const serviceCreatePost = async (req) => {
    const { content, post_img_url, title } = req.body;
    try {
        const userId = await (0, user_utils_1.getUserId)(req);
        return new Promise((resolve, reject) => {
            const reqCreatePost = `INSERT INTO posts (p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, p_fk_user_id) VALUES (UUID(), "${content}", "${post_img_url}", NOW(), "${title}", NULL, "${userId}") `;
            database_1.db.query(reqCreatePost, (err) => {
                err ? reject(err) : resolve(true);
            });
        });
    }
    catch (err) {
        console.log(err);
        return err;
    }
};
exports.serviceCreatePost = serviceCreatePost;
const serviceGetAllPosts = () => {
    return new Promise((resolve, reject) => {
        const reqGetAllPosts = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM posts INNER JOIN users ON p_fk_user_id =  u_id`;
        database_1.db.query(reqGetAllPosts, (err, rows) => {
            err ? reject(err) : resolve(rows);
        });
    });
};
exports.serviceGetAllPosts = serviceGetAllPosts;
const serviceGetOnePost = (req) => {
    return new Promise((resolve, reject) => {
        const reqGetOnePost = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = "${req.params.id}"`;
        database_1.db.query(reqGetOnePost, (err, rows) => {
            err ? reject(err) : resolve(rows[0]);
        });
    });
};
exports.serviceGetOnePost = serviceGetOnePost;
const serviceGetPostsByAuthor = (req) => {
    return new Promise((resolve, reject) => {
        const reqGetPostsByAuthor = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM users INNER JOIN posts ON u_id = p_fk_user_id WHERE u_uid = "${req.body.author}"`;
        database_1.db.query(reqGetPostsByAuthor, (err, rows) => {
            err ? reject(err) : resolve(rows);
        });
    });
};
exports.serviceGetPostsByAuthor = serviceGetPostsByAuthor;
// export const serviceUpdatePost = (req: Request): Promise<QueryError | boolean>
//# sourceMappingURL=post.services.js.map