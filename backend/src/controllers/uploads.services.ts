import { QueryError } from "mysql2";
import { db } from "../../config/database";
import {
  createAvatarUrl,
  deleteAvatarImgOnServer,
} from "../utils/uploads.utils";
import { checkIfUserExistAndGetDatas } from "../utils/users.utils";

export const serviceSetAvatarUrl = async (
  file: any,
  requestUserUid: string,
  avatarOwner: string,
  protocol: string,
  host: string
): Promise<QueryError | boolean | unknown> => {
  const datas = await checkIfUserExistAndGetDatas(file, avatarOwner);
  const oldAvatarUrl = datas.u_avatar_url;
  const reqUser = datas.u_uid;
  if (reqUser === requestUserUid) {
    return new Promise((resolve, reject) => {
      const avatarUrl = createAvatarUrl(file, protocol, host, oldAvatarUrl);
      const reqSetAvatarUrl: string = `UPDATE users SET u_avatar_url = "${avatarUrl}" WHERE u_uid = "${requestUserUid}"`;
      db.query(reqSetAvatarUrl, (err: QueryError) => {
        err ? (console.log(err), reject(Error("query error"))) : resolve(true);
      });
    });
  } else {
    deleteAvatarImgOnServer(file, "");
    throw Error("forbidden");
  }
};
