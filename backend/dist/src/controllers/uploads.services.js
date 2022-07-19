"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceSetAvatarUrl = void 0;
const database_1 = require("../../config/database");
const uploads_utils_1 = require("../utils/uploads.utils");
const users_utils_1 = require("../utils/users.utils");
const serviceSetAvatarUrl = async (file, requestUserUid, avatarOwner, protocol, host) => {
    const datas = await (0, users_utils_1.checkIfUserExistAndGetDatas)(file, avatarOwner);
    const oldAvatarUrl = datas.u_avatar_url;
    const reqUser = datas.u_uid;
    if (reqUser === requestUserUid && file) {
        return new Promise((resolve, reject) => {
            const avatarUrl = (0, uploads_utils_1.createAvatarUrl)(file, protocol, host, oldAvatarUrl);
            const sql = "UPDATE users SET u_avatar_url = ? WHERE u_uid = ?";
            const values = [avatarUrl, requestUserUid];
            database_1.db.execute(sql, values, (err) => {
                err
                    ? (console.log(err), reject(Error("query error")))
                    : resolve(avatarUrl);
            });
        });
    }
    else if (reqUser === requestUserUid && !file) {
        const oldAvatarUrl = datas.u_avatar_url;
        (0, uploads_utils_1.deleteAvatarImgOnServer)(file, oldAvatarUrl);
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE users SET u_avatar_url = "" WHERE u_uid = ?';
            const value = [requestUserUid];
            database_1.db.execute(sql, value, (err) => {
                err ? (console.log(err), reject(Error("query error"))) : resolve(true);
            });
        });
    }
    else {
        (0, uploads_utils_1.deleteAvatarImgOnServer)(file, "");
        throw Error("forbidden");
    }
};
exports.serviceSetAvatarUrl = serviceSetAvatarUrl;
//# sourceMappingURL=uploads.services.js.map