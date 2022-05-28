"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfLikeUserIsOwner = exports.checkIfLikeExistAndGetDatas = void 0;
const database_1 = require("../../config/database");
const checkIfLikeExistAndGetDatas = (req, postId, likeUserId) => {
    return new Promise((resolve, reject) => {
        const sqlCheckLikeAndGetDatas = `SELECT pl_id, pl_value, u_id FROM likes INNER JOIN posts ON pl_fk_post_id = ${postId} INNER JOIN users ON pl_fk_user_id = ${likeUserId}`;
        database_1.db.query(sqlCheckLikeAndGetDatas, (err, rows) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : rows.length === 0
                    ? resolve(true)
                    : //   TODO : faire le check ISOWNER ici !!!
                        resolve(rows[0]);
        });
    });
};
exports.checkIfLikeExistAndGetDatas = checkIfLikeExistAndGetDatas;
const checkIfLikeUserIsOwner = (likeUserId, rows) => {
    const likeUser = likeUserId;
    const likeOwner = rows[0].u_id;
    likeUser === likeOwner ? true : false;
};
exports.checkIfLikeUserIsOwner = checkIfLikeUserIsOwner;
//# sourceMappingURL=likes.utils.js.map