"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfPostExistAndGetDatas = void 0;
const database_1 = require("../../config/database");
const checkIfPostExistAndGetDatas = (postId) => {
    return new Promise((resolve, reject) => {
        const sqlPost = `SELECT u_uid, p_post_img_url FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = '${postId}'`;
        database_1.db.query(sqlPost, (err, rows) => {
            err ? reject(err) : rows.length === 0 ? resolve(false) : resolve(rows[0]);
        });
    });
};
exports.checkIfPostExistAndGetDatas = checkIfPostExistAndGetDatas;
//# sourceMappingURL=post.utils.js.map