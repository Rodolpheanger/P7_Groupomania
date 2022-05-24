"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfPostExistAndGetDatas = void 0;
const database_1 = require("../../config/database");
const uploads_utils_1 = require("./uploads.utils");
const checkIfPostExistAndGetDatas = (req, postId) => {
    return new Promise((resolve, reject) => {
        const sqlPost = `SELECT u_uid, p_post_img_url FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = '${postId}'`;
        database_1.db.query(sqlPost, (err, rows) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : rows.length === 0
                    ? ((0, uploads_utils_1.deletePostImageOnServer)(req, ""), reject(Error("post not found")))
                    : resolve(rows[0]);
        });
    });
};
exports.checkIfPostExistAndGetDatas = checkIfPostExistAndGetDatas;
//# sourceMappingURL=post.utils.js.map