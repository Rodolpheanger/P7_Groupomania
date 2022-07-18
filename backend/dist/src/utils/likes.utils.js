"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfLikeExistAndGetDatas = void 0;
const database_1 = require("../../config/database");
const checkIfLikeExistAndGetDatas = (postId, likeUserId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT pl_id, pl_value, pl_fk_user_id FROM posts_likes JOIN posts ON pl_fk_post_id = ? WHERE p_id = ? AND pl_fk_user_id = ?";
        const value = [postId, postId, likeUserId];
        database_1.db.execute(sql, value, (err, rows) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : rows.length === 0
                    ? resolve(false)
                    : resolve(rows[0]);
        });
    });
};
exports.checkIfLikeExistAndGetDatas = checkIfLikeExistAndGetDatas;
//# sourceMappingURL=likes.utils.js.map