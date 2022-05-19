"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceSetPostImageUrl = exports.serviceSetAvatarUrl = void 0;
const database_1 = require("../../config/database");
const user_utils_1 = require("../utils/user.utils");
const serviceSetAvatarUrl = async (req) => {
    const userUid = req.userUid;
    const avatarOwner = req.body.uid;
    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/avatars/${req.file.filename}`;
    try {
        const userExist = await (0, user_utils_1.checkIfUserExistAndGetData)(avatarOwner, "u_uid");
        return !userExist
            ? false
            : userExist === userUid
                ? new Promise((resolve, reject) => {
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
const serviceSetPostImageUrl = async (req) => {
    return new Promise((resolve, reject) => {
        const postImageUrl = `${req.protocol}://${req.get("host")}/frontend/public/uploads/images/${req.file.filename}`;
        const reqSetPostImageUrl = `UPDATE posts SET p_post_img_url = ${postImageUrl} WHERE p_uid = ${req.body.uid}`;
        database_1.db.query(reqSetPostImageUrl, (err) => {
            err ? reject(err) : resolve(true);
        });
    });
};
exports.serviceSetPostImageUrl = serviceSetPostImageUrl;
//# sourceMappingURL=upload.services.js.map