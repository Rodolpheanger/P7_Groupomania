"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceSetAvatarUrl = void 0;
const database_1 = require("../../config/database");
const uploads_utils_1 = require("../utils/uploads.utils");
const user_utils_1 = require("../utils/user.utils");
const serviceSetAvatarUrl = async (req) => {
    const userUid = req.userUid;
    const avatarOwner = req.body.uid;
    const datas = await (0, user_utils_1.checkIfUserExistAndGetDatas)(req, avatarOwner);
    const oldAvatarUrl = datas.u_avatar_url;
    const reqUser = datas.u_uid;
    if (reqUser === userUid) {
        return new Promise((resolve, reject) => {
            const avatarUrl = (0, uploads_utils_1.createAvatarUrl)(req, oldAvatarUrl);
            const reqSetAvatarUrl = `UPDATE users SET u_avatar_url = "${avatarUrl}" WHERE u_uid = "${userUid}"`;
            database_1.db.query(reqSetAvatarUrl, (err) => {
                err ? (console.log(err), reject(Error("query error"))) : resolve(true);
            });
        });
    }
    else {
        (0, uploads_utils_1.deleteAvatarImgOnServer)(req, "");
        throw Error("forbidden");
    }
};
exports.serviceSetAvatarUrl = serviceSetAvatarUrl;
//# sourceMappingURL=upload.services.js.map