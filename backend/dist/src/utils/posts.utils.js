"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfUserIsPostOwnerAndGetDatas = exports.checkIfPostExistAndGetDatas = void 0;
const database_1 = require("../../config/database");
const uploads_utils_1 = require("./uploads.utils");
const checkIfPostExistAndGetDatas = (file, postUid) => {
    let filename = "";
    return new Promise((resolve, reject) => {
        const sqlPost = `SELECT u_uid, p_post_img_url, p_id FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = '${postUid}'`;
        database_1.db.query(sqlPost, (err, rows) => {
            err
                ? (console.log(err), reject(Error("query error")))
                : rows.length === 0 && file
                    ? ((filename = file.filename),
                        (0, uploads_utils_1.deleteNewImageOnServer)(filename),
                        console.log(err),
                        reject(Error("post not found")))
                    : rows.length === 0
                        ? (console.log(err), reject(Error("post not found")))
                        : resolve(rows[0]);
        });
    });
};
exports.checkIfPostExistAndGetDatas = checkIfPostExistAndGetDatas;
const checkIfUserIsPostOwnerAndGetDatas = async (file, postUid) => {
    const postDatas = await (0, exports.checkIfPostExistAndGetDatas)(file, postUid);
    const postOwner = postDatas.u_uid;
    const postId = postDatas.p_id;
    const postImgUrl = postDatas.p_post_img_url;
    return { postOwner, postId, postImgUrl };
};
exports.checkIfUserIsPostOwnerAndGetDatas = checkIfUserIsPostOwnerAndGetDatas;
//# sourceMappingURL=posts.utils.js.map