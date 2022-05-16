"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceGetAllPosts = exports.serviceCreatePost = void 0;
const database_1 = require("../../config/database");
const getUserId = (req) => {
    console.log(req.auth);
    return new Promise((resolve, reject) => {
        const reqGetUserId = `SELECT id FROM users WHERE uid = "${req.auth}"`;
        database_1.db.query(reqGetUserId, (err, rows) => {
            console.log(rows);
            err ? reject(err) : resolve(rows[0].id);
        });
    });
};
const serviceCreatePost = async (req) => {
    try {
        const userId = await getUserId(req);
        return new Promise((resolve, reject) => {
            const reqCreatePost = `INSERT INTO posts (uid, content, post_img_url, creation_date, title, modification_date, user_id) VALUES (UUID(), "${req.body.content}", "${req.body.post_img_url}", NOW(), "${req.body.title}", NULL, "${userId}") `;
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
const serviceGetAllPosts = (req) => {
    return new Promise((resolve, reject) => {
        const reqGetAllPosts = `SELECT uid, content, post_img_url, creation_date, title, modification_date, user_id FROM posts`;
        database_1.db.query(reqGetAllPosts, (err, rows) => {
            err ? reject(err) : resolve(rows);
        });
    });
};
exports.serviceGetAllPosts = serviceGetAllPosts;
//# sourceMappingURL=post.services.js.map