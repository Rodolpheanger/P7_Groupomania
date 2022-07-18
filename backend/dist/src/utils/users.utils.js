"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserIsUserOwner = exports.checkIfUserExistAndGetDatas = void 0;
const database_1 = require("../../config/database");
const uploads_utils_1 = require("./uploads.utils");
const checkIfUserExistAndGetDatas = (file, requestUserUid) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT u_id, u_uid, u_avatar_url, u_password FROM users WHERE u_uid = ?`;
        const values = [requestUserUid];
        database_1.db.execute(sql, values, (err, rows) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : rows.length === 0 && file
                    ? ((0, uploads_utils_1.deleteAvatarImgOnServer)(file, ""),
                        console.log(`User "${requestUserUid}" not found`),
                        reject(Error(`user not found`)))
                    : rows.length === 0
                        ? (console.log(`User "${requestUserUid}" not found`),
                            reject(Error(`user not found`)))
                        : resolve(rows[0]);
        });
    });
};
exports.checkIfUserExistAndGetDatas = checkIfUserExistAndGetDatas;
const checkIfUserIsUserOwner = async (file, requestUserUid) => {
    const datas = await (0, exports.checkIfUserExistAndGetDatas)(file, requestUserUid);
    const userOwner = datas.u_uid;
    const userId = datas.u_id;
    const avatarUrl = datas.u_avatar_url;
    return { userOwner, userId, avatarUrl };
};
exports.checkIfUserIsUserOwner = checkIfUserIsUserOwner;
//# sourceMappingURL=users.utils.js.map