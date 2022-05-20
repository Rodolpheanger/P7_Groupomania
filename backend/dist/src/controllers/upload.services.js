"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceSetAvatarUrl = void 0;
const database_1 = require("../../config/database");
const uploads_utils_1 = require("../utils/uploads.utils");
const user_utils_1 = require("../utils/user.utils");
const serviceSetAvatarUrl = async (req) => {
    const userUid = req.userUid;
    const avatarOwner = req.body.uid;
    try {
        const datas = await (0, user_utils_1.checkIfUserExistAndGetDatas)(avatarOwner, "u_uid");
        const oldAvatarUrl = datas.u_avatar_url;
        console.log("serviceSet: ", oldAvatarUrl);
        const reqUser = datas.u_uid;
        return !reqUser
            ? false
            : reqUser === userUid
                ? new Promise((resolve, reject) => {
                    const avatarUrl = (0, uploads_utils_1.createAvatarUrl)(req, oldAvatarUrl);
                    const reqSetAvatarUrl = `UPDATE users SET u_avatar_url = "${avatarUrl}" WHERE u_uid = "${userUid}"`;
                    database_1.db.query(reqSetAvatarUrl, (err) => {
                        err ? reject(err) : resolve(true);
                    });
                })
                : "Forbidden";
    }
    catch (err) {
        console.log(err);
        return err;
    }
};
exports.serviceSetAvatarUrl = serviceSetAvatarUrl;
//# sourceMappingURL=upload.services.js.map