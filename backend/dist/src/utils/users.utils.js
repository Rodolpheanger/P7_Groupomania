"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserIsUserOwner = exports.checkIfUserExistAndGetDatas = void 0;
const database_1 = require("../../config/database");
const uploads_utils_1 = require("./uploads.utils");
const checkIfUserExistAndGetDatas = (file, userUid) => {
    return new Promise((resolve, reject) => {
        const sqlFindUser = `SELECT u_id, u_uid, u_avatar_url FROM users WHERE u_uid = '${userUid}'`;
        database_1.db.query(sqlFindUser, (err, rows) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : rows.length === 0 && file
                    ? ((0, uploads_utils_1.deleteAvatarImgOnServer)(file, ""),
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
const checkIfUserIsUserOwner = async (req, userUid) => {
    const datas = await (0, exports.checkIfUserExistAndGetDatas)(req, userUid);
    const userOwner = datas.u_uid;
    const userId = datas.u_id;
    const avatarUrl = datas.u_avatar_url;
    return { userOwner, userId, avatarUrl };
};
exports.checkIfUserIsUserOwner = checkIfUserIsUserOwner;
//# sourceMappingURL=users.utils.js.map