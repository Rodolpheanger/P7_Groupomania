import { Request } from "express";
import { QueryError } from "mysql2";
import { db } from "../../config/database";
import { createAvatarUrl } from "../utils/uploads.utils";
import { checkIfUserExistAndGetDatas } from "../utils/user.utils";

export const serviceSetAvatarUrl = async (
  req: Request | any
): Promise<QueryError | boolean | unknown> => {
  const userUid = req.userUid;
  const avatarOwner = req.body.uid;
  try {
    const datas = await checkIfUserExistAndGetDatas(avatarOwner, "u_uid");
    const oldAvatarUrl = datas.u_avatar_url;
    console.log("serviceSet: ", oldAvatarUrl);
    const reqUser = datas.u_uid;
    return !reqUser
      ? false
      : reqUser === userUid
      ? new Promise((resolve, reject) => {
          const avatarUrl = createAvatarUrl(req, oldAvatarUrl);
          const reqSetAvatarUrl: string = `UPDATE users SET u_avatar_url = "${avatarUrl}" WHERE u_uid = "${userUid}"`;
          db.query(reqSetAvatarUrl, (err: QueryError) => {
            err ? reject(err) : resolve(true);
          });
        })
      : "Forbidden";
  } catch (err) {
    console.log(err);
    return err;
  }
};
