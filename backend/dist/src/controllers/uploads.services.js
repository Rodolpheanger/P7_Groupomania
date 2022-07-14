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
            const reqSetAvatarUrl = `UPDATE users SET u_avatar_url = "${avatarUrl}" WHERE u_uid = "${requestUserUid}"`;
            database_1.db.query(reqSetAvatarUrl, (err) => {
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
            const reqSetAvatarUrl = `UPDATE users SET u_avatar_url = "" WHERE u_uid = "${requestUserUid}"`;
            database_1.db.query(reqSetAvatarUrl, (err) => {
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
// export const serviceDeleteAvatarUrl = async (
//   file: any,
//   requestUserUid: string,
//   avatarOwner: string
// ): Promise<QueryError | boolean | unknown> => {
//   const datas = await checkIfUserExistAndGetDatas(file, avatarOwner);
//   const reqUser = datas.u_uid;
//   const oldAvatarUrl = datas.u_avatar_url;
//   if (reqUser === requestUserUid && oldAvatarUrl) {
//     return new Promise((resolve, reject) => {
//       const reqDeleteAvatar: string = `DELETE FROM users SET u_avatar_url = NULL WHERE u_uid = "${requestUserUid}"`;
//     });
//   }
// };
//# sourceMappingURL=uploads.services.js.map