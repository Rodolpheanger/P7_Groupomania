"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserIsCommentOwner = exports.checkIfCommentExistAndGetDatas = void 0;
const database_1 = require("../../config/database");
const post_utils_1 = require("./post.utils");
const user_utils_1 = require("./user.utils");
const checkIfCommentExistAndGetDatas = (commentUid) => {
    return new Promise((resolve, reject) => {
        const sqlPost = `SELECT c_id, p_uid, u_uid FROM comments INNER JOIN posts ON c_fk_post_id = p_id INNER JOIN users ON c_fk_user_id = u_id WHERE c_uid = '${commentUid}'`;
        database_1.db.query(sqlPost, (err, rows) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : rows.length === 0
                    ? (console.log(err), reject(Error("comment not found")))
                    : resolve(rows[0]);
        });
    });
};
exports.checkIfCommentExistAndGetDatas = checkIfCommentExistAndGetDatas;
const checkIfUserIsCommentOwner = async (req) => {
    const commentUid = req.params.id;
    const commentDatas = await (0, exports.checkIfCommentExistAndGetDatas)(commentUid);
    const commentId = commentDatas.c_id;
    await (0, post_utils_1.checkIfPostExistAndGetDatas)(req, commentDatas.p_uid);
    const userDatas = await (0, user_utils_1.checkIfUserExistAndGetDatas)(req, commentDatas.u_uid);
    const commentOwner = userDatas.u_uid;
    return { commentId, commentOwner };
};
exports.checkIfUserIsCommentOwner = checkIfUserIsCommentOwner;
//# sourceMappingURL=comment.utils.js.map