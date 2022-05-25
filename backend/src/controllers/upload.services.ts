import { Request } from "express";
import { QueryError } from "mysql2";
import { db } from "../../config/database";
import {
  createAvatarUrl,
  deleteAvatarImgOnServer,
} from "../utils/uploads.utils";
import { checkIfUserExistAndGetDatas } from "../utils/user.utils";

export const serviceSetAvatarUrl = async (
  req: Request | any
): Promise<QueryError | boolean | unknown> => {
  const userUid = req.userUid;
  const avatarOwner = req.body.uid;
  const datas = await checkIfUserExistAndGetDatas(req, avatarOwner);
  const oldAvatarUrl = datas.u_avatar_url;
  const reqUser = datas.u_uid;
  if (reqUser === userUid) {
    return new Promise((resolve, reject) => {
      const avatarUrl = createAvatarUrl(req, oldAvatarUrl);
      const reqSetAvatarUrl: string = `UPDATE users SET u_avatar_url = "${avatarUrl}" WHERE u_uid = "${userUid}"`;
      db.query(reqSetAvatarUrl, (err: QueryError) => {
        err ? (console.log(err), reject(Error("query error"))) : resolve(true);
      });
    });
  } else {
    deleteAvatarImgOnServer(req, "");
    throw Error("forbidden");
  }
};
