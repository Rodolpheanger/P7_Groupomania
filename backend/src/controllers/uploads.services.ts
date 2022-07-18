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
  if (reqUser === requestUserUid && file) {
    return new Promise((resolve, reject) => {
      const avatarUrl = createAvatarUrl(file, protocol, host, oldAvatarUrl);
      const sql: string =
        'UPDATE users SET u_avatar_url = "${avatarUrl}" WHERE u_uid = ?';
      const value: any = [requestUserUid];
      db.execute(sql, value, (err: QueryError | null) => {
        err
          ? (console.log(err), reject(Error("query error")))
          : resolve(avatarUrl);
      });
    });
  } else if (reqUser === requestUserUid && !file) {
    const oldAvatarUrl = datas.u_avatar_url;
    deleteAvatarImgOnServer(file, oldAvatarUrl);
    return new Promise((resolve, reject) => {
      const sql: string = 'UPDATE users SET u_avatar_url = "" WHERE u_uid = ?';
      const value: any = [requestUserUid];
      db.execute(sql, value, (err: QueryError | null) => {
        err ? (console.log(err), reject(Error("query error"))) : resolve(true);
      });
    });
  } else {
    deleteAvatarImgOnServer(file, "");
    throw Error("forbidden");
  }
};
