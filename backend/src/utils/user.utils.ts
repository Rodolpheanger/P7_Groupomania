import { Request } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";
import { deleteAvatarImgOnServer } from "./uploads.utils";

export const checkIfUserExistAndGetDatas = (
  req: Request | any,
  userUid: string
): Promise<QueryError | RowDataPacket[0]> => {
  return new Promise((resolve, reject) => {
    const sqlFindUser: string = `SELECT u_id, u_uid, u_avatar_url FROM users WHERE u_uid = '${userUid}'`;
    db.query(sqlFindUser, (err: QueryError, rows: RowDataPacket[0]): any => {
      err
        ? (console.log(err), reject(Error("query error")))
        : rows.length === 0 && req.file
        ? (deleteAvatarImgOnServer(req, ""),
          console.log(`User "${userUid}" not found`),
          reject(Error(`user not found`)))
        : rows.length === 0
        ? (console.log(`User "${userUid}" not found`),
          reject(Error(`user not found`)))
        : resolve(rows[0]);
    });
  });
};

export const checkIfUserIsUserOwner = async (req: Request, userUid: string) => {
  const datas = await checkIfUserExistAndGetDatas(req, userUid);
  const userOwner = datas.u_uid;
  const userId = datas.u_id;
  const avatarUrl = datas.u_avatar_url;
  return { userOwner, userId, avatarUrl };
};
