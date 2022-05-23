"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserExistAndGetDatas = exports.getUserId = void 0;
const database_1 = require("../../config/database");
const getUserId = (req) => {
    return new Promise((resolve, reject) => {
        const userUid = req.userUid;
        const reqGetUserId = `SELECT u_id FROM users WHERE u_uid = "${userUid}"`;
        database_1.db.query(reqGetUserId, (err, rows) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : rows.length === 0
                    ? (console.log(`User "${userUid} not found`),
                        reject(Error("user not found")))
                    : resolve(rows[0].u_id);
        });
    });
};
exports.getUserId = getUserId;
const checkIfUserExistAndGetDatas = (data, dataType) => {
    return new Promise((resolve, reject) => {
        const sqlFindUser = `SELECT u_uid, u_avatar_url FROM users WHERE ${dataType} = '${data}'`;
        database_1.db.query(sqlFindUser, (err, rows) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : rows.length === 0
                    ? (console.log(`User "${data}" not found`),
                        reject(Error(`user not found`)))
                    : resolve(rows[0]);
        });
    });
};
exports.checkIfUserExistAndGetDatas = checkIfUserExistAndGetDatas;
//# sourceMappingURL=user.utils.js.map