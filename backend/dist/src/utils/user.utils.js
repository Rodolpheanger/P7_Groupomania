"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserExistAndGetDatas = void 0;
const database_1 = require("../../config/database");
const uploads_utils_1 = require("./uploads.utils");
const checkIfUserExistAndGetDatas = (req, userUid) => {
    return new Promise((resolve, reject) => {
        const sqlFindUser = `SELECT u_id, u_uid, u_avatar_url FROM users WHERE u_uid = '${userUid}'`;
        database_1.db.query(sqlFindUser, (err, rows) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : rows.length === 0 && req.file
                    ? ((0, uploads_utils_1.deleteAvatarImgOnServer)(req, ""),
                        console.log(`User "${userUid}" not found`),
                        reject(Error(`user not found`)))
                    : rows.length === 0
                        ? (console.log(`User "${userUid}" not found`),
                            reject(Error(`user not found`)))
                        : resolve(rows[0]);
        });
    });
};
exports.checkIfUserExistAndGetDatas = checkIfUserExistAndGetDatas;
//# sourceMappingURL=user.utils.js.map