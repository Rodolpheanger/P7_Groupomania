import { Request } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../../config/database";

export const getUserId = (req: Request | any): Promise<QueryError | number> => {
  return new Promise((resolve, reject) => {
    const userUid = req.userUid;
    const reqGetUserId: string = `SELECT u_id FROM users WHERE u_uid = "${userUid}"`;
    db.query(reqGetUserId, (err: QueryError, rows: RowDataPacket[]) => {
      err
        ? (console.log(err), reject(Error("query error")))
        : rows.length === 0
        ? (console.log(`User "${userUid} not found`),
          reject(Error("user not found")))
        : resolve(rows[0].u_id);
    });
  });
};

export const checkIfUserExistAndGetDatas = (
  data: string,
  dataType: string
): Promise<QueryError | boolean | any> => {
  return new Promise((resolve, reject) => {
    const sqlFindUser: string = `SELECT u_uid, u_avatar_url FROM users WHERE ${dataType} = '${data}'`;
    db.query(sqlFindUser, (err: QueryError, rows: RowDataPacket[0]): any => {
      err
        ? (console.log(err), reject(Error("query error")))
        : rows.length === 0
        ? (console.log(`User "${data}" not found`),
          reject(Error(`user not found`)))
        : resolve(rows[0]);
    });
  });
};
